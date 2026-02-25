from .models import Users, Ville
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .utils.rank_city import rank_city



#==================== Route Publique ====================

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