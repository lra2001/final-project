from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsOwnerOrModerator

# Create your views here.

@api_view(['GET'])
def api(request):
    return Response({'message': 'Api load correctly!'})

class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing reviews:
    - Anyone can view
    - Authenticated users can create
    - Owners can edit/delete their own reviews
    - Moderators/Admins can edit/delete any review
    """
    queryset = Review.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrModerator]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)