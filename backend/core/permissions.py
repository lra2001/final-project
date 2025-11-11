from rest_framework import permissions

class IsOwnerOrModerator(permissions.BasePermission):
    """
    Custom permission:
    - Anyone can view (SAFE_METHODS)
    - Authenticated users can create reviews
    - Owners can edit/delete their own reviews
    - Moderators/Admins can edit/delete any review
    """

    def has_permission(self, request, view):
        # Allow all GET/HEAD/OPTIONS requests
        if request.method in permissions.SAFE_METHODS:
            return True

        # Require authentication for other actions (POST, PUT, DELETE)
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are always allowed
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow owners, moderators, or admins
        return (
            obj.user == request.user
            or request.user.groups.filter(name__in=["Moderator", "Admin"]).exists()
            or request.user.is_staff
        )