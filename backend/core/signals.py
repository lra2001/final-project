from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()

@receiver(post_save, sender=User)
def add_user_to_default_group(sender, instance, created, **kwargs):
    """
    Automatically add newly registered users to the 'User' group.
    """
    if created:
        try:
            user_group = Group.objects.get(name="User")
            instance.groups.add(user_group)
            print(f" Added {instance.username} to 'User' group.")
        except Group.DoesNotExist:
            print(" 'User' group does not exist. Run `python manage.py setup_roles` first.")