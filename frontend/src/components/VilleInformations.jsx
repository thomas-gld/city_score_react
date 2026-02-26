import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export default function VilleInformations() {

  // équivalent useRoute()
  const { cityName } = useParams();
  const villeSelectionnee = decodeURIComponent(cityName);

  const [cityList, setCityList] = useState([]);

  // 
  // Fetch
  // 
  useEffect(() => {
    const fetchVilleInfos = async () => {
      try {
        const response = await fetch("/ville_informations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Erreur API:", response.status);
          return;
        }

        const data = await response.json();
        console.log("Villes reçues:", data);
        setCityList(data);

      } catch (error) {
        console.error("Erreur lors de la récupération des villes:", error);
      }
    };

    fetchVilleInfos();
  }, []);

  // 
  //  Extraire les infos de la ville (utiliser useMemeo en react, l'équivalent de computed() en VueJS)
  // 
  const villeActuelle = useMemo(() => {
    if (!cityList.length) return null;
    return cityList.find(v => v.name === villeSelectionnee);
  }, [cityList, villeSelectionnee]);

  
  const ville = villeActuelle?.name;
  const presentation = villeActuelle?.description;
  const age = villeActuelle?.age;
  const pop = villeActuelle?.pop;

  const sun_hours = villeActuelle?.climat?.sun_hours;
  const temp_max = villeActuelle?.climat?.temp_max;
  const temp_min = villeActuelle?.climat?.temp_min;

  const nb_theatre = villeActuelle?.loisirs?.[0]?.nb_theatre;
  const nb_musee = villeActuelle?.loisirs?.[0]?.nb_musee;
  const nb_gymnase = villeActuelle?.loisirs?.[0]?.nb_gymnase;

  const nb_soins = villeActuelle?.lieux?.nb_soins;
  const nb_parcs = villeActuelle?.lieux?.nb_parcs;
  const nb_restaurants = villeActuelle?.lieux?.nb_restaurants;
  const nb_bars = villeActuelle?.lieux?.nb_bars;

  // 
  // Menu de scroll 
  // 
  const scrollMenu = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // 
  // Render
  //
  return (
    <div className="container">

      <div className="cadre-image bloc">
        <span id="city">{ville}</span>
        {ville && (
          <img
            src={`/images/${ville}.jpeg`}
            alt={ville}
            className="ville-image"
          />
        )}
      </div>

      
      <div className="bloc">
        <div className="v-btn-toggle">
          <button onClick={() => scrollMenu("presentation")}>Présentation</button>
          <button onClick={() => scrollMenu("population")}>Population</button>
          <button onClick={() => scrollMenu("climat")}>Climat</button>
          <button onClick={() => scrollMenu("culture")}>Culture</button>
          <button onClick={() => scrollMenu("sante")}>Santé</button>
          <button onClick={() => scrollMenu("loisirs")}>Loisirs</button>
        </div>
      </div>

      {villeActuelle && (
        <>
          <div id="presentation" className="bloc">
            <h3>Présentation de {ville}</h3>
            <p>{presentation}</p>
          </div>

          <div id="population" className="bloc">
            <h3>Population</h3>
            <p>Nombre d'habitants : {pop}</p>
            <p>Âge moyen : {age} ans</p>
          </div>

          <div id="climat" className="bloc">
            <h3>Climat</h3>
            <p>Ensoleillement : {sun_hours} heures/an</p>
            <p>Température maximale moyenne : {temp_max}°C</p>
            <p>Température minimale moyenne : {temp_min}°C</p>
          </div>

          <div id="culture" className="bloc">
            <h3>Culture</h3>
            <p>Théâtres : {nb_theatre}</p>
            <p>Musées : {nb_musee}</p>
          </div>

          <div id="sante" className="bloc">
            <h3>Santé</h3>
            <p>Centres de soins : {nb_soins}</p>
          </div>

          <div id="loisirs" className="bloc">
            <h3>Loisirs</h3>
            <p>Gymnases : {nb_gymnase}</p>
            <p>Parcs : {nb_parcs}</p>
            <p>Restaurants : {nb_restaurants}</p>
            <p>Bars : {nb_bars}</p>
          </div>
        </>
      )}
    </div>
  );
}