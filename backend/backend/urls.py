"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from database.views import UserView, TripView, ItemView

router = routers.DefaultRouter()
router.register("users", UserView)
router.register("trips", TripView)
router.register("items", ItemView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(router.urls)),
    path("api/users/<int:user_id>/trips", TripView.as_view({"get":"get_trips"})),
    path("api/users/<int:user_id>/trips/<int:trip_id>", ItemView.as_view({"get": "get_items", "post":"create_item"})),
    path("api/users/<int:user_id>/trips/<int:trip_id>/<int:item_id>", ItemView.as_view({"put":"update_item", "delete":"delete_item"}))

]
