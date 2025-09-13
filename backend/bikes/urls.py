from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HomeBannerView,
    InfoSectionViewSet,
    SupportFeatureViewSet,
    FeaturedBikeViewSet,
    FeatureViewSet,
    TestimonialSectionViewSet,
    RiderStoryViewSet, 
    FAQViewSet,
    AboutViewSet,
    MissionViewSet,
    ApproachSectionViewSet,
     ContactInfoViewSet,
     BikeViewSet,
     BikeBookingStepViewSet,
     SellBannerViewSet,
     SellbikeCalculatorSectionViewSet,
     HowItWorksSectionViewSet,
     AuthViewSet,
     PaymentViewSet


)

# Router for ViewSets
router = DefaultRouter()
router.register(r"infosection", InfoSectionViewSet, basename="infosection")
router.register(r"support-features", SupportFeatureViewSet, basename="support-features")
router.register(r"featured-bikes", FeaturedBikeViewSet, basename="featured-bikes")
router.register(r"features", FeatureViewSet, basename="features")
router.register(r"testimonials", TestimonialSectionViewSet, basename="testimonials")
router.register(r"rider-stories", RiderStoryViewSet, basename="rider-stories")  # 👈 new
router.register(r"faqs", FAQViewSet, basename="faqs")
router.register(r'about', AboutViewSet)
router.register(r"mission", MissionViewSet, basename="mission")
router.register(r"approach", ApproachSectionViewSet, basename="approach")
router.register(r"contact-info", ContactInfoViewSet, basename="contact-info")
router.register(r"bikes", BikeViewSet, basename="bikes")
router.register(r'booking-steps', BikeBookingStepViewSet, basename='booking-steps')
router.register(r"sell-banner", SellBannerViewSet, basename="sell-banner")
router.register(r"calculator-section", SellbikeCalculatorSectionViewSet, basename="calculator-section")
router.register(r"how-it-works-section", HowItWorksSectionViewSet, basename="how-it-works-section")
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'payments', PaymentViewSet, basename='payments')







urlpatterns = [
    # Normal APIViews
    path("home-banner/", HomeBannerView.as_view(), name="home-banner"),

    # Router-based ViewSets
    path("", include(router.urls)),
]
