from django.contrib.auth.hashers import make_password
from .models import Users, Ville
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .utils.rank_city import rank_city



#==================== Register ====================

@api_view(["POST"])
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
        user = Users.objects.create(
            name=username,
            password=make_password(password)
        )
        return Response({"message": "Utilisateur créé !"}, status=status.HTTP_201_CREATED)
    
    except Exception: # Capture l'erreur si le nom existe déjà
        return Response({"error": "Ce nom est déjà pris"}, status=status.HTTP_400_BAD_REQUEST)
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

    result = {city: round(score, 2) for city, score in sorted(scores.items(), key=lambda x: x[1], reverse=True)}

    return Response(result, status=status.HTTP_200_OK)
