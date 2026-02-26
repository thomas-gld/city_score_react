import django, os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from api.models import Ville, Climat, Loisir, Localisation, Lieux

villes_data = [
    {
        "name": "Paris", "pop": 2161000, "age": 38,
        "description": "Capitale de la France, ville lumière.",
        "climat": {"temp_max": 25, "temp_min": 4, "sun_hours": 1630},
        "loisir": {"nb_theatre": 100, "nb_gymnase": 400, "nb_musee": 130},
        "localisation": {"dist_mer": 300, "dist_montagne": 400, "latitude": 48.8566, "longitude": 2.3522},
        "lieux": {"nb_bars": 1500, "nb_restaurants": 40000, "nb_soins": 1500, "nb_parcs": 450},
    },
    {
        "name": "Lyon", "pop": 522000, "age": 37,
        "description": "Capitale de la gastronomie.",
        "climat": {"temp_max": 28, "temp_min": 3, "sun_hours": 2000},
        "loisir": {"nb_theatre": 20, "nb_gymnase": 90, "nb_musee": 30},
        "localisation": {"dist_mer": 250, "dist_montagne": 60, "latitude": 45.7640, "longitude": 4.8357},
        "lieux": {"nb_bars": 400, "nb_restaurants": 4500, "nb_soins": 300, "nb_parcs": 120},
    },
    {
        "name": "Marseille", "pop": 869000, "age": 37,
        "description": "Deuxième ville de France, cité phocéenne.",
        "climat": {"temp_max": 30, "temp_min": 8, "sun_hours": 2800},
        "loisir": {"nb_theatre": 10, "nb_gymnase": 80, "nb_musee": 15},
        "localisation": {"dist_mer": 1, "dist_montagne": 40, "latitude": 43.2965, "longitude": 5.3698},
        "lieux": {"nb_bars": 500, "nb_restaurants": 5000, "nb_soins": 250, "nb_parcs": 60},
    },
    {
        "name": "Bordeaux", "pop": 260000, "age": 36,
        "description": "Capitale mondiale du vin.",
        "climat": {"temp_max": 27, "temp_min": 5, "sun_hours": 2050},
        "loisir": {"nb_theatre": 8, "nb_gymnase": 50, "nb_musee": 12},
        "localisation": {"dist_mer": 55, "dist_montagne": 180, "latitude": 44.8378, "longitude": -0.5792},
        "lieux": {"nb_bars": 300, "nb_restaurants": 2500, "nb_soins": 150, "nb_parcs": 80},
    },
    {
        "name": "Toulouse", "pop": 493000, "age": 35,
        "description": "La ville rose, capitale de l'aéronautique.",
        "climat": {"temp_max": 29, "temp_min": 4, "sun_hours": 2050},
        "loisir": {"nb_theatre": 12, "nb_gymnase": 70, "nb_musee": 14},
        "localisation": {"dist_mer": 150, "dist_montagne": 80, "latitude": 43.6047, "longitude": 1.4442},
        "lieux": {"nb_bars": 350, "nb_restaurants": 3000, "nb_soins": 180, "nb_parcs": 100},
    },
    {
        "name": "Nice", "pop": 343000, "age": 42,
        "description": "Perle de la Côte d'Azur.",
        "climat": {"temp_max": 28, "temp_min": 10, "sun_hours": 2700},
        "loisir": {"nb_theatre": 6, "nb_gymnase": 40, "nb_musee": 20},
        "localisation": {"dist_mer": 1, "dist_montagne": 25, "latitude": 43.7102, "longitude": 7.2620},
        "lieux": {"nb_bars": 250, "nb_restaurants": 2000, "nb_soins": 200, "nb_parcs": 50},
    },
    {
        "name": "Nantes", "pop": 320000, "age": 36,
        "description": "Ville de l'ouest, ancienne capitale des Ducs de Bretagne.",
        "climat": {"temp_max": 24, "temp_min": 4, "sun_hours": 1800},
        "loisir": {"nb_theatre": 7, "nb_gymnase": 55, "nb_musee": 10},
        "localisation": {"dist_mer": 55, "dist_montagne": 320, "latitude": 47.2184, "longitude": -1.5536},
        "lieux": {"nb_bars": 280, "nb_restaurants": 2200, "nb_soins": 160, "nb_parcs": 90},
    },
    {
        "name": "Strasbourg", "pop": 290000, "age": 38,
        "description": "Capitale européenne, entre France et Allemagne.",
        "climat": {"temp_max": 26, "temp_min": 1, "sun_hours": 1700},
        "loisir": {"nb_theatre": 9, "nb_gymnase": 45, "nb_musee": 18},
        "localisation": {"dist_mer": 450, "dist_montagne": 25, "latitude": 48.5734, "longitude": 7.7521},
        "lieux": {"nb_bars": 200, "nb_restaurants": 1800, "nb_soins": 140, "nb_parcs": 70},
    },
    {
        "name": "Montpellier", "pop": 292000, "age": 33,
        "description": "Ville universitaire du sud, proche de la mer.",
        "climat": {"temp_max": 30, "temp_min": 6, "sun_hours": 2600},
        "loisir": {"nb_theatre": 6, "nb_gymnase": 50, "nb_musee": 8},
        "localisation": {"dist_mer": 12, "dist_montagne": 70, "latitude": 43.6108, "longitude": 3.8767},
        "lieux": {"nb_bars": 300, "nb_restaurants": 2000, "nb_soins": 130, "nb_parcs": 75},
    },
    {
        "name": "Lille", "pop": 235000, "age": 34,
        "description": "Capitale des Flandres, ville étudiante du nord.",
        "climat": {"temp_max": 22, "temp_min": 2, "sun_hours": 1550},
        "loisir": {"nb_theatre": 8, "nb_gymnase": 45, "nb_musee": 12},
        "localisation": {"dist_mer": 80, "dist_montagne": 500, "latitude": 50.6292, "longitude": 3.0573},
        "lieux": {"nb_bars": 220, "nb_restaurants": 1600, "nb_soins": 120, "nb_parcs": 55},
    },
]

created = 0
for d in villes_data:
    if Ville.objects.filter(name=d["name"]).exists():
        print(f"  {d['name']} déjà en base, ignorée.")
        continue

    ville = Ville.objects.create(name=d["name"], pop=d["pop"], age=d["age"], description=d["description"])
    Climat.objects.create(ville=ville, **d["climat"])
    Loisir.objects.create(ville=ville, **d["loisir"])
    Localisation.objects.create(ville=ville, **d["localisation"])
    Lieux.objects.create(ville=ville, **d["lieux"])
    print(f"  ✓ {d['name']}")
    created += 1

print(f"\n{created} ville(s) créée(s). Total en base : {Ville.objects.count()}")
