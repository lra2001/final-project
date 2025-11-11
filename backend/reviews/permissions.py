from rest_framework import permissions

class IsOwnerOrModerator(permissions.BasePermission):
    """
    Custom permission:
    - Users can modify their own reviews.
    - Moderators and admins can modify any review.
    - Everyone can read reviews.
    """

    def has_permission(self, request, view):
        # All authenticated users can view or create
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Read-only permissions for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Moderators and admins can edit/delete anything
        if request.user.is_staff or request.user.groups.filter(name="Moderator").exists():
            return True

        # Otherwise, only the owner can edit/delete
        return obj.user == request.user