import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "../GlobalState";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Resultats() {
  const { criteres, lieux, meteo, loisir, important, categories } = useGlobalState();
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const userPrefs = { criteres, lieux, meteo, loisir, important, categories };

  // Icônes Leaflet
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const goldIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const greyIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const orangeIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Formattage population
  const formatPopulation = (pop) => (pop ? pop.toLocaleString("fr-FR") : "N/A");

  // Fetch API et initialisation de la carte
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchResults = async () => {
      try {
        const response = await fetch("/api/process_results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userPrefs),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setCityList(data);

        if (data.length > 0) initMap(data);
      } catch (err) {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des résultats");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const initMap = (cities) => {
    if (!mapContainer.current || cities.length === 0) return;

    if (mapRef.current) mapRef.current.remove();

    mapRef.current = L.map(mapContainer.current);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    cities.forEach((city, index) => {
      let icon = defaultIcon;
      if (index === 0) icon = goldIcon;
      else if (index === 1) icon = greyIcon;
      else if (index === 2) icon = orangeIcon;

      L.marker([city.latitude, city.longitude], { icon })
        .addTo(mapRef.current)
        .bindPopup(`
          <strong>${city.name}</strong><br/>
          Classement: #${index + 1}<br/>
          Score: ${city.score ? city.score.toFixed(1) : "N/A"}
        `);
    });

    const bounds = L.latLngBounds(cities.map((c) => [c.latitude, c.longitude]));
    mapRef.current.fitBounds(bounds, { padding: [40, 40] });

    // Légende
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `
        <h4>Légende</h4>
        <div><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png" />1ère place</div>
        <div><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png" />2ème place</div>
        <div><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" />3ème place</div>
        <div><img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" />Autres villes</div>
      `;
      return div;
    };
    legend.addTo(mapRef.current);
  };

  const goToVilleInfo = (ville) => {
    window.open(`/ville-informations/${ville.name}`, "_blank");
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">
        Tu es fait pour vivre à {cityList[0]?.name || "N/A"}
      </h1>

      <div ref={mapContainer} className="map-container w-full h-96 mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cityList.map((ville, i) => (
          <div key={i} className="border-2 p-5 rounded-lg shadow-lg bg-yellow-50">
            <h2 className="text-xl font-bold mb-2">{ville.name}</h2>
            <p><strong>Score:</strong> {ville.score ? ville.score.toFixed(1) : "N/A"}</p>
            <p><strong>Population:</strong> {formatPopulation(ville.pop)} habitants</p>

            {ville.loisirs && ville.loisirs.length > 0 && (
              <div>
                <h3 className="font-semibold">Loisirs</h3>
                <p>Musées: {ville.loisirs[0].nb_musee}</p>
                <p>Théâtres: {ville.loisirs[0].nb_theatre}</p>
                <p>Gymnases: {ville.loisirs[0].nb_gymnase}</p>
              </div>
            )}

            <button
              className="mt-3 px-4 py-2 bg-yellow-300 rounded-lg shadow hover:bg-yellow-400"
              onClick={() => goToVilleInfo(ville)}
            >
              Informations
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}