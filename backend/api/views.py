from django.shortcuts import render
from .models import Users
from rest_framework.response import Response
from rest_framework.decorators import api_view



#==================== Route Publique ====================

@api_view(["GET"])
def test(request):
    return Response({"status": "ok"})