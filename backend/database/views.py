from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
import json
from .models import User, Trip, Item
from .serializers import UserSerializer, TripSerializer, ItemSerializer

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TripView(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get_trips(self, request, *args, **kwargs):
        user_id = kwargs["user_id"]
        trips = Trip.objects.filter(user_id=user_id)
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)
    

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_items(self, request, *args, **kwargs):
        trip_id = kwargs["trip_id"]
        items = Item.objects.filter(trip_id=trip_id)
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data)

    def check_item(self, request, *args, **kwargs):
        item_id = kwargs["item_id"]
        item = Item.objects.get(id=item_id)
        item.completed = not item.completed
        item.save()

        return Response(ItemSerializer(item).data, status=status.HTTP_204_NO_CONTENT)
    
    def create_item(self, request, *args, **kwargs):
        description = request.data["description"]
        trip_id = kwargs["trip_id"]

        item = Item.objects.create(description=description, trip_id=trip_id)
        item.save()

        return Response(ItemSerializer(item).data)
    
    def delete_item(self, request, *args, **kwargs):
        item_id = kwargs["item_id"]
        item = Item.objects.get(id=item_id)
        item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)




    

    


