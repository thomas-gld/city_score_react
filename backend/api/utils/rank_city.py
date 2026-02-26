from api.models import Ville


def make_city_score(city_list):
    city_score = {}
    for city in city_list:
        city_score[city] = 50
    return city_score


def handle_q1(city_score_tab, criteres):

    villes = (
        Ville.objects
        .select_related("climat", "lieux")
        .prefetch_related("loisirs")
        .all()
    )

    for ville in villes:

        climat = getattr(ville, "climat", None)
        lieux = getattr(ville, "lieux", None)
        loisir = ville.loisirs.first()

        # ---------------- CLIMAT
        if climat:
            if 20 <= climat.temp_max <= 30:
                city_score_tab[ville.name] += (
                    10 * criteres["climatValue"] / 100
                )

            if climat.temp_min <= 10:
                city_score_tab[ville.name] -= (
                    10 * criteres["climatValue"] / 100
                )

            if climat.temp_max >= 30:
                city_score_tab[ville.name] -= (
                    10 * criteres["climatValue"] / 100
                )

        # ---------------- CULTURE
        if loisir:
            if loisir.nb_theatre >= 5:
                city_score_tab[ville.name] += (
                    5 * criteres["cultureValue"] / 100
                )
            else:
                city_score_tab[ville.name] -= (
                    5 * criteres["cultureValue"] / 100
                )

            if loisir.nb_musee >= 5:
                city_score_tab[ville.name] += (
                    5 * criteres["cultureValue"] / 100
                )
            else:
                city_score_tab[ville.name] -= (
                    5 * criteres["cultureValue"] / 100
                )

        # ---------------- LOISIRS
        if loisir and lieux:
            if loisir.nb_theatre >= 5:
                city_score_tab[ville.name] += (
                    5 * criteres["loisirValue"] / 100
                )
            else:
                city_score_tab[ville.name] -= (
                    5 * criteres["loisirValue"] / 100
                )

            if lieux.nb_bars >= 50:
                city_score_tab[ville.name] += (
                    5 * criteres["loisirValue"] / 100
                )
            else:
                city_score_tab[ville.name] -= (
                    5 * criteres["loisirValue"] / 100
                )

        # ---------------- SANTÉ
        if lieux:
            if lieux.nb_soins >= 5:
                city_score_tab[ville.name] += (
                    10 * criteres["santeValue"] / 100
                )
            else:
                city_score_tab[ville.name] -= (
                    10 * criteres["santeValue"] / 100
                )

    return city_score_tab


def handle_q2(city_score_tab, lieux):

    villes = (
        Ville.objects
        .select_related("localisation")
        .all()
    )

    for ville in villes:

        localisation = getattr(ville, "localisation", None)
        if not localisation:
            continue

        # ---------------- MER
        if lieux in ["mer", "both"]:

            if localisation.dist_mer < 50:
                city_score_tab[ville.name] += 10

            elif 50 <= localisation.dist_mer < 100:
                city_score_tab[ville.name] += 5

            elif 100 <= localisation.dist_mer < 200:
                city_score_tab[ville.name] -= 5

            else:  # >= 200
                city_score_tab[ville.name] -= 10

        # ---------------- MONTAGNE
        if lieux in ["montagne", "both"]:

            if localisation.dist_montagne < 50:
                city_score_tab[ville.name] += 10

            elif 50 <= localisation.dist_montagne < 100:
                city_score_tab[ville.name] += 5

            elif 100 <= localisation.dist_montagne < 200:
                city_score_tab[ville.name] -= 5

            else:  # >= 200
                city_score_tab[ville.name] -= 10

    return city_score_tab


def handle_q3(city_score_tab, meteo):
    villes = (
        Ville.objects
        .select_related("climat")
        .all()
    )

    temp_moy = []
    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue
        moy = (climat.temp_max + climat.temp_min) / 2
        temp_moy.append(moy)

    min_temp_moy = min(temp_moy)
    max_temp_moy = max(temp_moy)
    temp_moy_range = max_temp_moy - min_temp_moy
    if temp_moy_range == 0:
        temp_moy_range = 1  # éviter la division par zéro au cas où le range = 0

    heat_value_normalized = meteo["heatValue"] / 100

    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue

        temp_moy_ville = (climat.temp_max + climat.temp_min) / 2
        temp_normalized = (temp_moy_ville - min_temp_moy) / temp_moy_range
        distance = abs(temp_normalized - heat_value_normalized)
        weight = 10 * (1 - distance)

        city_score_tab[ville.name] += weight

    return city_score_tab


def handle_q4(city_score_tab, meteo):
    villes = (
        Ville.objects
        .select_related("climat")
        .all()
    )
    sun_hours = []
    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue
        sun_hours.append(climat.sun_hours)

    if not sun_hours:
        return city_score_tab

    min_sun = min(sun_hours)
    max_sun = max(sun_hours)
    sun_range = max_sun - min_sun
    if sun_range == 0:
        sun_range = 1

    sun_value_normalized = meteo["sunValue"] / 100

    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue

        sun_normalized = (climat.sun_hours - min_sun) / sun_range
        distance = abs(sun_normalized - sun_value_normalized)
        weight = 10 * (1 - distance)

        city_score_tab[ville.name] += weight

    return city_score_tab


def handle_q5(city_score_tab, user_pref5):
    # user_pref5 est un tableau de catégories, ex: ["etudiant", "actif"]

    villes = Ville.objects.order_by("age").all()

    if not villes:
        return city_score_tab

    ville_plus_jeune = villes[0]
    ville_plus_vielle = villes[len(villes) - 1]

    for cat in user_pref5:
        if cat == "etudiant":
            city_score_tab[ville_plus_jeune.name] += 5

        elif cat == "retraite":
            city_score_tab[ville_plus_vielle.name] += 5

        elif cat == "actif":
            for ville in villes:
                if 21 <= ville.age <= 60:
                    city_score_tab[ville.name] += 2

        elif cat == "autres":
            for ville in villes:
                if 21 <= ville.age <= 45:
                    city_score_tab[ville.name] += 2

    return city_score_tab


def handle_q6(city_score_tab, user_pref6):
    villes = Ville.objects.select_related("lieux").all()

    # ----------------- Espaces verts (parcs)
    parcs = [getattr(v.lieux, "nb_parcs", 0) for v in villes if hasattr(v, "lieux")]
    if parcs:
        min_parcs = min(parcs)
        max_parcs = max(parcs)
        parcs_range = max_parcs - min_parcs
        if parcs_range == 0:
            parcs_range = 1

        espace_vert_normalized = user_pref6["espaceVertValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            parcs_normalized = (lieux.nb_parcs - min_parcs) / parcs_range
            distance = abs(parcs_normalized - espace_vert_normalized)
            weight = 10 * (1 - distance)
            city_score_tab[ville.name] += weight

    # -----------------Restaurants
    restaurants = [getattr(v.lieux, "nb_restaurants", 0) for v in villes if hasattr(v, "lieux")]
    if restaurants:
        min_restaurants = min(restaurants)
        max_restaurants = max(restaurants)
        restaurants_range = max_restaurants - min_restaurants
        if restaurants_range == 0:
            restaurants_range = 1

        restaurant_normalized = user_pref6["restaurantValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            restaurants_normalized = (lieux.nb_restaurants - min_restaurants) / restaurants_range
            distance = abs(restaurants_normalized - restaurant_normalized)
            weight = 10 * (1 - distance)
            city_score_tab[ville.name] += weight

    # -----------------Bars
    bars = [getattr(v.lieux, "nb_bars", 0) for v in villes if hasattr(v, "lieux")]
    if bars:
        min_bars = min(bars)
        max_bars = max(bars)
        bars_range = max_bars - min_bars
        if bars_range == 0:
            bars_range = 1

        bar_normalized = user_pref6["barValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            bars_normalized = (lieux.nb_bars - min_bars) / bars_range
            distance = abs(bars_normalized - bar_normalized)
            weight = 10 * (1 - distance)
            city_score_tab[ville.name] += weight

    # -----------------Lieux de santé
    soins = [getattr(v.lieux, "nb_soins", 0) for v in villes if hasattr(v, "lieux")]
    if soins:
        min_soins = min(soins)
        max_soins = max(soins)
        soins_range = max_soins - min_soins
        if soins_range == 0:
            soins_range = 1

        sante_normalized = user_pref6["santeValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            soins_normalized = (lieux.nb_soins - min_soins) / soins_range
            distance = abs(soins_normalized - sante_normalized)
            weight = 10 * (1 - distance)
            city_score_tab[ville.name] += weight

    return city_score_tab


def rank_city(city_list, user_pref):
    city_score_tab = make_city_score(city_list)

    handle_q1(city_score_tab, user_pref["criteres"])
    print("Q1:", city_score_tab)

    handle_q2(city_score_tab, user_pref["lieux"])
    print("Q2:", city_score_tab)

    handle_q3(city_score_tab, user_pref["meteo"])
    print("Q3:", city_score_tab)

    handle_q4(city_score_tab, user_pref["meteo"])
    print("Q4:", city_score_tab)

    handle_q5(city_score_tab, user_pref["categories"])
    print("Q5:", city_score_tab)

    handle_q6(city_score_tab, user_pref["important"])
    print("Q6:", city_score_tab)

    return city_score_tab
