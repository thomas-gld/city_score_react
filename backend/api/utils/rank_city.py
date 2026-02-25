from api.models import Ville


def makeCityScore(cityList):
    cityScore = {}
    for city in cityList:
        cityScore[city] = 50
    return cityScore


def handleQ1(cityScoreTab, criteres):

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
                cityScoreTab[ville.name] += (
                    10 * criteres["climatValue"] / 100
                )

            if climat.temp_min <= 10:
                cityScoreTab[ville.name] -= (
                    10 * criteres["climatValue"] / 100
                )

            if climat.temp_max >= 30:
                cityScoreTab[ville.name] -= (
                    10 * criteres["climatValue"] / 100
                )

        # ---------------- CULTURE
        if loisir:
            if loisir.nb_theatre >= 5:
                cityScoreTab[ville.name] += (
                    5 * criteres["cultureValue"] / 100
                )
            else:
                cityScoreTab[ville.name] -= (
                    5 * criteres["cultureValue"] / 100
                )

            if loisir.nb_musee >= 5:
                cityScoreTab[ville.name] += (
                    5 * criteres["cultureValue"] / 100
                )
            else:
                cityScoreTab[ville.name] -= (
                    5 * criteres["cultureValue"] / 100
                )

        # ---------------- LOISIRS
        if loisir and lieux:
            if loisir.nb_theatre >= 5:
                cityScoreTab[ville.name] += (
                    5 * criteres["loisirValue"] / 100
                )
            else:
                cityScoreTab[ville.name] -= (
                    5 * criteres["loisirValue"] / 100
                )

            if lieux.nb_bars >= 50:
                cityScoreTab[ville.name] += (
                    5 * criteres["loisirValue"] / 100
                )
            else:
                cityScoreTab[ville.name] -= (
                    5 * criteres["loisirValue"] / 100
                )

        # ---------------- SANTÉ
        if lieux:
            if lieux.nb_soins >= 5:
                cityScoreTab[ville.name] += (
                    10 * criteres["santeValue"] / 100
                )
            else:
                cityScoreTab[ville.name] -= (
                    10 * criteres["santeValue"] / 100
                )

    return cityScoreTab


def handleQ2(cityScoreTab, lieux):

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
                cityScoreTab[ville.name] += 10

            elif 50 <= localisation.dist_mer < 100:
                cityScoreTab[ville.name] += 5

            elif 100 <= localisation.dist_mer < 200:
                cityScoreTab[ville.name] -= 5

            else:  # >= 200
                cityScoreTab[ville.name] -= 10

        # ---------------- MONTAGNE
        if lieux in ["montagne", "both"]:

            if localisation.dist_montagne < 50:
                cityScoreTab[ville.name] += 10

            elif 50 <= localisation.dist_montagne < 100:
                cityScoreTab[ville.name] += 5

            elif 100 <= localisation.dist_montagne < 200:
                cityScoreTab[ville.name] -= 5

            else:  # >= 200
                cityScoreTab[ville.name] -= 10

    return cityScoreTab



def handleQ3(cityScoreTab, meteo):
    villes = (
        Ville.objects
        .select_related("climat")
        .all()
    )

    tempMoy = []
    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue
        moy = (climat.temp_max + climat.temp_min) / 2
        tempMoy.append(moy)

    mintempMoy = min(tempMoy)
    maxtempMoy = max(tempMoy)
    tempMoyRange = maxtempMoy - mintempMoy
    if tempMoyRange == 0:  
        tempMoyRange = 1  # éviter la division par zéro au cas où le range = 0

    heatValueNormalized = meteo["heatValue"] / 100

    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue

        tempMoyVille = (climat.temp_max + climat.temp_min) / 2
        tempNormalized = (tempMoyVille - mintempMoy) / tempMoyRange
        distance = abs(tempNormalized - heatValueNormalized)
        weight = 10 * (1 - distance)

        cityScoreTab[ville.name] += weight

    return cityScoreTab




def handleQ4(cityScoreTab, meteo):
    villes = (
        Ville.objects
        .select_related("climat")
        .all()
    )
    sunHours = []
    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue
        sunHours.append(climat.sun_hours)

    if not sunHours:
        return cityScoreTab

    minSun = min(sunHours)
    maxSun = max(sunHours)
    sunRange = maxSun - minSun
    if sunRange == 0:
        sunRange = 1

    sunValueNormalized = meteo["sunValue"] / 100

    for ville in villes:
        climat = getattr(ville, "climat", None)
        if not climat:
            continue

        sunNormalized = (climat.sun_hours - minSun) / sunRange
        distance = abs(sunNormalized - sunValueNormalized)
        weight = 10 * (1 - distance)

        cityScoreTab[ville.name] += weight

    return cityScoreTab




def handleQ5(cityScoreTab, userPref5):

    villes = Ville.objects.order_by("age").all()  # Trier les villes par âge croissant

    if not villes:
        return cityScoreTab

    villePlusJeune = villes[0]
    villePlusVielle = villes[len(villes) - 1]

    if userPref5 == "etudiant":
        cityScoreTab[villePlusJeune.name] += 5

    elif userPref5 == "retraite":
        cityScoreTab[villePlusVielle.name] += 5

    elif userPref5 == "actif":
        for ville in villes:
            if 21 <= ville.age <= 60:
                cityScoreTab[ville.name] += 2

    elif userPref5 == "autres":
        for ville in villes:
            if 21 <= ville.age <= 45:
                cityScoreTab[ville.name] += 2

    return cityScoreTab






def handleQ6(cityScoreTab, userPref6):
    villes = Ville.objects.select_related("lieux").all()

    # ----------------- Espaces verts (parcs)
    parcs = [getattr(v.lieux, "nb_parcs", 0) for v in villes if hasattr(v, "lieux")]
    if parcs:
        minParcs = min(parcs)
        maxParcs = max(parcs)
        parcsRange = maxParcs - minParcs
        if parcsRange == 0:
            parcsRange = 1

        espaceVertNormalized = userPref6["espaceVertValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            parcsNormalized = (lieux.nb_parcs - minParcs) / parcsRange
            distance = abs(parcsNormalized - espaceVertNormalized)
            weight = 10 * (1 - distance)
            cityScoreTab[ville.name] += weight

    # -----------------Restaurants
    restaurants = [getattr(v.lieux, "nb_restaurants", 0) for v in villes if hasattr(v, "lieux")]
    if restaurants:
        minRestaurants = min(restaurants)
        maxRestaurants = max(restaurants)
        restaurantsRange = maxRestaurants - minRestaurants
        if restaurantsRange == 0:
            restaurantsRange = 1

        restaurantNormalized = userPref6["restaurantValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            restaurantsNormalized = (lieux.nb_restaurants - minRestaurants) / restaurantsRange
            distance = abs(restaurantsNormalized - restaurantNormalized)
            weight = 10 * (1 - distance)
            cityScoreTab[ville.name] += weight

    # -----------------Bars
    bars = [getattr(v.lieux, "nb_bars", 0) for v in villes if hasattr(v, "lieux")]
    if bars:
        minBars = min(bars)
        maxBars = max(bars)
        barsRange = maxBars - minBars
        if barsRange == 0:
            barsRange = 1

        barNormalized = userPref6["barValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            barsNormalized = (lieux.nb_bars - minBars) / barsRange
            distance = abs(barsNormalized - barNormalized)
            weight = 10 * (1 - distance)
            cityScoreTab[ville.name] += weight

    # -----------------Lieux de santé
    soins = [getattr(v.lieux, "nb_soins", 0) for v in villes if hasattr(v, "lieux")]
    if soins:
        minSoins = min(soins)
        maxSoins = max(soins)
        soinsRange = maxSoins - minSoins
        if soinsRange == 0:
            soinsRange = 1

        santeNormalized = userPref6["santeValue"] / 100

        for ville in villes:
            lieux = getattr(ville, "lieux", None)
            if not lieux:
                continue
            soinsNormalized = (lieux.nb_soins - minSoins) / soinsRange
            distance = abs(soinsNormalized - santeNormalized)
            weight = 10 * (1 - distance)
            cityScoreTab[ville.name] += weight

    return cityScoreTab




def rankCity(cityList, userPref):
    cityScoreTab = makeCityScore(cityList)

    handleQ1(cityScoreTab, userPref["criteres"])
    print("Q1:", cityScoreTab)

    handleQ2(cityScoreTab, userPref["lieux"])
    print("Q2:", cityScoreTab)

    handleQ3(cityScoreTab, userPref["meteo"])
    print("Q3:", cityScoreTab)

    handleQ4(cityScoreTab, userPref["meteo"])
    print("Q4:", cityScoreTab)

    handleQ5(cityScoreTab, userPref["categories"])
    print("Q5:", cityScoreTab)

    handleQ6(cityScoreTab, userPref["important"])
    print("Q6:", cityScoreTab)

    return cityScoreTab