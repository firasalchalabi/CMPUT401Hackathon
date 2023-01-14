from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlannerSerializer
from .models import Database

# Create your views here.


class PlannerViewSet(viewsets.ModelViewSet):
    serializer_class = PlannerSerializer
    queryset = Database.objects.all()