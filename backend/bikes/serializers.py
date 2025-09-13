from rest_framework import serializers
from .models import HomeBanner, BannerImage, InfoSection, SupportFeature, Feature, TestimonialSection, Testimonial, RiderStory, FAQ,HowItWorksCard, Payment
from .models import Mission, ApproachSection, ApproachImage, ContactInfo, ContactMessage, Bike, BikeBookingStep,SellBanner, SellbikeCalculatorSection,HowItWorksSection, HowItWorksCard
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class BannerImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerImage
        fields = ["id", "image"]

class HomeBannerSerializer(serializers.ModelSerializer):
    images = BannerImageSerializer(many=True, read_only=True)

    class Meta:
        model = HomeBanner
        fields = ["id", "title", "description", "button_text", "button_link", "images"]


class InfoSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoSection
        fields = "__all__"

class SupportFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportFeature
        fields = "__all__"

from rest_framework import serializers
from .models import FeaturedBike

class FeaturedBikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedBike
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = "__all__"

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"

class TestimonialSectionSerializer(serializers.ModelSerializer):
    reviews = TestimonialSerializer(many=True, read_only=True)

    class Meta:
        model = TestimonialSection
        fields = "__all__"

class RiderStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RiderStory
        fields = ["id", "title", "description", "image"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"

# serializers.py
from rest_framework import serializers
from .models import About

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = "__all__"


class ApproachImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApproachImage
        fields = ["id", "image"]

class ApproachImageSerializer(serializers.ModelSerializer):
    # return absolute URL for the image
    image = serializers.SerializerMethodField()

    class Meta:
        model = ApproachImage
        fields = ("id", "image")

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class ApproachSectionSerializer(serializers.ModelSerializer):
    images = ApproachImageSerializer(many=True, read_only=True)

    class Meta:
        model = ApproachSection
        fields = ("id", "title", "description", "images")

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = "__all__"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = '__all__'


class BikeBookingStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeBookingStep
        fields = '__all__'


class SellBannerSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ensures full URL

    class Meta:
        model = SellBanner
        fields = "__all__"

class SellbikeCalculatorSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellbikeCalculatorSection
        fields = '__all__'
class HowItWorksCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowItWorksCard
        fields = ["id", "title", "image", "description"]


class HowItWorksSectionSerializer(serializers.ModelSerializer):
    cards = HowItWorksCardSerializer(many=True, read_only=True)

    class Meta:
        model = HowItWorksSection
        fields = ["id", "section_title", "background_color", "cards"]

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {"user": user}
    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"