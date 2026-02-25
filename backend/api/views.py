from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from .models import Users
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



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