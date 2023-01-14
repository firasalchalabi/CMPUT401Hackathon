from rest_framework import serializers
from .models import User, Trip, Item

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username']

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'destination', 'user_id']
    
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'description', 'completed', 'trip_id']