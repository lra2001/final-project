from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Group.objects.all(),
        required=False
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "groups"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        groups = validated_data.pop("groups", [])
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups)
        return user