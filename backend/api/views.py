from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Ville, Localisation
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from .utils.rank_city import rank_city
from django.http import JsonResponse


#==================== CSRF ====================

@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf(request):
    return Response({"detail": "CSRF cookie set"})


#==================== Register ====================

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print("username : ", username)
    print("password : ", password)
    
    if not username or not password:
        return Response(
            {"error": "Champs manquants"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(
            username=username,
            password=password
        )
        return Response({"message": "Utilisateur créé !"}, status=status.HTTP_201_CREATED)
    
    except Exception: # Capture l'erreur si le nom existe déjà
        return Response({"error": "Ce nom est déjà pris"}, status=status.HTTP_400_BAD_REQUEST)
    

#======================== Login =====================

@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request): 
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        auth_login(request, user) 
        return JsonResponse({"message": "Success"}, status=200)
    
    return JsonResponse({"error": "Invalid credentials"}, status=401)
        

#==================== Test =====================

@api_view(["GET"])
def test(request):
    return Response({"status": "ok"})



@api_view(["POST"])
def city_score(request):
    user_pref = request.data

    required_keys = ["criteres", "lieux", "meteo", "categories", "important"]
    for key in required_keys:
        if key not in user_pref:
            return Response(
                {"error": f"Champ manquant : {key}"},
                status=status.HTTP_400_BAD_REQUEST
            )

    city_list = list(Ville.objects.values_list("name", flat=True))

    scores = rank_city(city_list, user_pref)

    locations = {
        loc.ville.name: loc
        for loc in Localisation.objects.select_related("ville").all()
    }

    result = [
        {
            "name": city,
            "score": round(score, 2),
            "latitude": locations[city].latitude if city in locations else None,
            "longitude": locations[city].longitude if city in locations else None,
        }
        for city, score in sorted(scores.items(), key=lambda x: x[1], reverse=True)
    ]

    return Response(result, status=status.HTTP_200_OK)


#==================== Ville informations =====================



@api_view(["POST"])
def ville_informations(request):

    villes = (
        Ville.objects
        .select_related("localisation", "climat", "lieux")
        .prefetch_related("loisirs")
        .all()
    )
    city_list = []

    for v in villes:
        city_list.append({
            "name": v.name,
            "description": v.description,
            "age": v.age,
            "pop": v.pop,

            "localisation": {
                "latitude": v.localisation.latitude,
                "longitude": v.localisation.longitude,
                "dist_mer": v.localisation.dist_mer,
                "dist_montagne": v.localisation.dist_montagne,
            } if hasattr(v, "localisation") else None,

            "climat": {
                "sun_hours": v.climat.sun_hours,
                "temp_max": v.climat.temp_max,
                "temp_min": v.climat.temp_min,
            } if hasattr(v, "climat") else None,

            "lieux": {
                "nb_soins": v.lieux.nb_soins,
                "nb_parcs": v.lieux.nb_parcs,
                "nb_restaurants": v.lieux.nb_restaurants,
                "nb_bars": v.lieux.nb_bars,
            } if hasattr(v, "lieux") else None,

            "loisirs": [
                {
                    "nb_theatre": l.nb_theatre,
                    "nb_musee": l.nb_musee,
                    "nb_gymnase": l.nb_gymnase,
                }
                for l in v.loisirs.all()
            ]
        })

    return JsonResponse(city_list, safe=False)