from rest_framework import routers
from .views import PlannerViewSet

router = routers.DefaultRouter()
router.register(r'api/planner', PlannerViewSet, 'planner')

urlpatterns = router.urls