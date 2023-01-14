from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .models import User, Trip, Item
from .serializers import UserSerializer, TripSerializer, ItemSerializer

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TripView(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

        

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

