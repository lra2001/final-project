from rest_framework import permissions

class IsOwnerOrModerator(permissions.BasePermission):
    """Allow users to edit their own reviews; moderators/admins can edit all."""

    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return request.method in permissions.SAFE_METHODS

        if request.user.groups.filter(name__in=["Admin", "Moderator"]).exists():
            return True

        return obj.user == request.user
