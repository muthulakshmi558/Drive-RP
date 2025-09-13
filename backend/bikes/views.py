from rest_framework import generics, viewsets   
from .models import (
    HomeBanner, 
    InfoSection, 
    SupportFeature, 
    FeaturedBike, 
    Feature, 
    TestimonialSection, 
    RiderStory, 
    FAQ, Mission, 
    Bike, 
    BikeBookingStep,
    SellBanner, 
    SellbikeCalculatorSection,
    HowItWorksSection, 
    )

from .serializers import (
    HomeBannerSerializer,
    InfoSectionSerializer,
    SupportFeatureSerializer,
    FeaturedBikeSerializer,
    FeatureSerializer,
    TestimonialSectionSerializer,
    MissionSerializer,
    FAQSerializer,
    RiderStorySerializer,
    ApproachSectionSerializer,
    ContactInfoSerializer,
    ContactMessageSerializer,
    BikeSerializer,
    BikeBookingStepSerializer,
    SellBannerSerializer,
    SellbikeCalculatorSectionSerializer,
    HowItWorksSectionSerializer,
  
)
from .models import Mission, ApproachSection, ContactInfo, ContactMessage
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, viewsets
from .models import Payment, Bike
from .serializers import PaymentSerializer

class HomeBannerView(generics.ListAPIView):
    queryset = HomeBanner.objects.all()
    serializer_class = HomeBannerSerializer

class InfoSectionViewSet(viewsets.ModelViewSet):
    queryset = InfoSection.objects.all()
    serializer_class = InfoSectionSerializer

class SupportFeatureViewSet(viewsets.ModelViewSet):
    queryset = SupportFeature.objects.all()
    serializer_class = SupportFeatureSerializer

class FeaturedBikeViewSet(viewsets.ModelViewSet):
    queryset = FeaturedBike.objects.all()
    serializer_class = FeaturedBikeSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class TestimonialSectionViewSet(viewsets.ModelViewSet):
    queryset = TestimonialSection.objects.all()
    serializer_class = TestimonialSectionSerializer

class RiderStoryViewSet(viewsets.ModelViewSet):
    queryset = RiderStory.objects.all()
    serializer_class = RiderStorySerializer


class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

# views.py
from rest_framework import viewsets
from .models import About
from .serializers import AboutSerializer

class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

class MissionViewSet(viewsets.ModelViewSet):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer



class ApproachSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApproachSection.objects.prefetch_related("images").all()
    serializer_class = ApproachSectionSerializer


class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all().order_by('-id')
    serializer_class = BikeSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['brand', 'category', 'fuel_type', 'color', 'year', 'engine_cc']
    ordering_fields = ['price', 'km_driven', 'year']


class BikeBookingStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BikeBookingStep.objects.all()
    serializer_class = BikeBookingStepSerializer

class SellBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SellBanner.objects.all()
    serializer_class = SellBannerSerializer

class SellbikeCalculatorSectionViewSet(viewsets.ModelViewSet):
    queryset = SellbikeCalculatorSection.objects.all()
    serializer_class = SellbikeCalculatorSectionSerializer



class HowItWorksSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HowItWorksSection.objects.all()
    serializer_class = HowItWorksSectionSerializer


class AuthViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["post"])
    def register(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        # ✅ Password match check
        if password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Username exists check
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Email exists check (optional)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Create user
        user = User.objects.create_user(username=username, email=email, password=password)

        # ✅ Send welcome mail to user
        try:
            send_mail(
                subject="Welcome to Bike Store 🚴",
                message=f"Hi {user.username},\n\nThank you for registering with us! Enjoy exploring our bikes 🚲.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            # ✅ Send mail to admin
            send_mail(
                subject="🔔 New User Registered",
                message=f"A new user has registered:\n\nUsername: {user.username}\nEmail: {user.email}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            # Mail failure shouldn’t block registration
            print("Mail error:", e)

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentViewSet(viewsets.ViewSet):
    """
    Create payment and mark bike as booked
    """

    def create(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            bike_id = serializer.validated_data['bike'].id
            bike = Bike.objects.get(id=bike_id)

            if bike.is_booked:
                return Response({"error": "Bike is already booked"}, status=status.HTTP_400_BAD_REQUEST)

            # Save payment
            payment = serializer.save()

            # Update bike status
            bike.is_booked = True
            bike.save()

            return Response({"message": "Payment successful", "payment": PaymentSerializer(payment).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)