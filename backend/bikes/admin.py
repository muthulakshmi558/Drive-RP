from django.contrib import admin
from .models import HomeBanner, BannerImage, InfoSection, SupportFeature, FeaturedBike, Feature, TestimonialSection, Testimonial, RiderStory, FAQ
from .models import About, Mission, ApproachSection, ApproachImage, ContactInfo, ContactMessage, Bike, BikeBookingStep, SellBanner, SellbikeCalculatorSection,HowItWorksCard,HowItWorksSection
from .models import Bike, Payment

from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class BannerImageInline(admin.TabularInline):
    model = BannerImage
    extra = 1

@admin.register(HomeBanner)
class HomeBannerAdmin(admin.ModelAdmin):
    inlines = [BannerImageInline]
    list_display = ("title", "button_text", "button_link")

@admin.register(InfoSection)
class InfoSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "button_text", "button_link")

@admin.register(SupportFeature)
class SupportFeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    list_editable = ("order",)
    search_fields = ("title", "description")

@admin.register(FeaturedBike)
class FeaturedBikeAdmin(admin.ModelAdmin):
    list_display = ("title", "km_driven", "fuel_type", "owner", "price", "location")
    search_fields = ("title", "fuel_type", "location")
    list_filter = ("fuel_type", "owner", "location")

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "number", "subtitle")   # shows these columns in admin list
    search_fields = ("title", "subtitle")   

class TestimonialInline(admin.TabularInline):
    model = Testimonial
    extra = 1

@admin.register(TestimonialSection)
class TestimonialSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle")
    inlines = [TestimonialInline]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    list_editable = ("order",)
    search_fields = ("name", "role", "review")


@admin.register(RiderStory)
class RiderStoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title")
    search_fields = ("title",)

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "answer")
    search_fields = ("question",)

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "image")   # show id, title, and image field in list
    search_fields = ("title", "description")  # enable search in admin



@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "image")
    search_fields = ("title", "description")


class ApproachImageInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        count = 0
        for form in self.forms:
            if not getattr(form, "cleaned_data", None):
                continue
            if form.cleaned_data.get("DELETE"):
                continue
            # If the form contains a file or an existing instance, count it
            if form.cleaned_data.get("image") or getattr(form.instance, "pk", None):
                count += 1
        if count > 5:
            raise ValidationError("You can upload a maximum of 5 images for this section.")

class ApproachImageInline(admin.TabularInline):
    model = ApproachImage
    formset = ApproachImageInlineFormSet
    extra = 5
    max_num = 5

@admin.register(ApproachSection)
class ApproachSectionAdmin(admin.ModelAdmin):
    inlines = [ApproachImageInline]
    list_display = ("title",)

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("title", "email", "phone", "website")

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "reason", "created_at")
    readonly_fields = ("created_at",)

@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'year', 'price', 'is_booked')

@admin.register(BikeBookingStep)
class BikeBookingStepAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "image")
    search_fields = ("title", "description")


@admin.register(SellBanner)
class SellBannerAdmin(admin.ModelAdmin):
    list_display = ("id", "image")


admin.site.register(SellbikeCalculatorSection)
class SellbikeCalculatorSection(admin.ModelAdmin):
    list_display = ("title", "background_image")

@admin.register(HowItWorksCard)
class HowItWorksCardAdmin(admin.ModelAdmin):
    list_display = ("id", "title")

@admin.register(HowItWorksSection)
class HowItWorksSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "section_title")
    filter_horizontal = ("cards",)  # to select multiple cards easily

admin.site.unregister(User)  
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "is_staff", "is_active", "date_joined")
    search_fields = ("username", "email")
    list_filter = ("is_staff", "is_active", "date_joined")
    ordering = ("-date_joined",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("user", "bike", "payment_method", "total_amount", "created_at")
    list_filter = ("payment_method",)
    search_fields = ("user__username", "bike__title")