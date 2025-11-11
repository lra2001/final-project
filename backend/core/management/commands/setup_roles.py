from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from core.models import Review

class Command(BaseCommand):
    help = "Create default user groups and assign permissions"

    def handle(self, *args, **options):
        # Create admin, moderator, and user groups
        admin_group, _ = Group.objects.get_or_create(name="Admin")
        moderator_group, _ = Group.objects.get_or_create(name="Moderator")
        user_group, _ = Group.objects.get_or_create(name="User")

        # Grant all permissions to Admin group
        admin_perms = Permission.objects.all()
        admin_group.permissions.set(admin_perms)

        # Grant permissions to manage reviews and users to Moderator group
        review_ct = ContentType.objects.get_for_model(Review)
        user_ct = ContentType.objects.get(app_label="auth", model="user")
        moderator_perms = Permission.objects.filter(
            content_type__in=[review_ct, user_ct],
            codename__in=[
                "view_review", "add_review", "change_review", "delete_review",
                "view_user", "change_user",
            ]
        )
        moderator_group.permissions.set(moderator_perms)

        # Grant permissions to manage own reviews to User group
        user_perms = Permission.objects.filter(
            content_type=review_ct,
            codename__in=["view_review", "add_review", "change_review", "delete_review"]
        )
        user_group.permissions.set(user_perms)

        self.stdout.write(self.style.SUCCESS(" Roles setup complete"))