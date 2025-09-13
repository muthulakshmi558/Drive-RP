from django.db import models
from django.contrib.auth.models import User

class HomeBanner(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=50, default="Buy Now")
    button_link = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title


class BannerImage(models.Model):
    banner = models.ForeignKey(HomeBanner, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="banner_images/")

    def __str__(self):
        return f"Image for {self.banner.title}"

class InfoSection(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=50, blank=True, null=True)
    button_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to="info/")

    def __str__(self):
        return self.title
    
class SupportFeature(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="support_features/")  # icon/image
    order = models.PositiveIntegerField(default=0)  # to control order

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title
    
from django.db import models

class FeaturedBike(models.Model):
    title = models.CharField(max_length=255)  # e.g. "2023 | Yamaha MT 15 | 150CC BS6"
    image = models.ImageField(upload_to="featured_bikes/")
    km_driven = models.CharField(max_length=100)  # e.g. "8700 Km"
    fuel_type = models.CharField(max_length=50, choices=(("Petrol", "Petrol"), ("Diesel", "Diesel"), ("Electric", "Electric")))
    owner = models.CharField(max_length=50)  # e.g. "1st Owner"
    price = models.CharField(max_length=100)  # e.g. "₹ 1,15,000"
    location = models.CharField(max_length=100)  # e.g. "Thirunelveli"

    def __str__(self):
        return self.title

class Feature(models.Model):
    title = models.CharField(max_length=255)   # e.g. "Over 15000+ Satisfied Customers"
    icon = models.ImageField(upload_to="features/")  # upload icon
    number = models.CharField(max_length=50)   # e.g. "5000+"
    subtitle = models.CharField(max_length=100)  # e.g. "Bike Purchased"

    def __str__(self):
        return f"{self.number} {self.subtitle}"

class TestimonialSection(models.Model):
    title = models.CharField(max_length=200, default="Real Stories From our Happy Customer")
    subtitle = models.CharField(max_length=300, blank=True, null=True)

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    section = models.ForeignKey(TestimonialSection, on_delete=models.CASCADE, related_name="reviews")
    name = models.CharField(max_length=100)   # e.g., Sarah M.
    role = models.CharField(max_length=100)   # e.g., First-Time Buyer
    review = models.TextField()
    image = models.ImageField(upload_to="testimonials/")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.role}"

class RiderStory(models.Model):
    title = models.CharField(max_length=200)   # "Trusted by Riders Like You"
    description = models.TextField()           # Paragraph content
    image = models.ImageField(upload_to="rider_stories/")  # Right side image

    def __str__(self):
        return self.title
    
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.question

# models.py
from django.db import models

class About(models.Model):
    title = models.CharField(max_length=200, default="About Us")
    description = models.TextField()
    image = models.ImageField(upload_to="about/", blank=True, null=True)  # 👈 add this

    def __str__(self):
        return self.title

from django.db import models

class Mission(models.Model):
    title = models.CharField(max_length=200, default="Our Mission")
    description = models.TextField()
    image = models.ImageField(upload_to="mission/", blank=True, null=True)

    def __str__(self):
        return self.title


from django.db import models

class ApproachSection(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title


class ApproachImage(models.Model):
    section = models.ForeignKey(
        ApproachSection,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="approach/")

    def __str__(self):
        return f"Image for {self.section.title}"
    
class ContactInfo(models.Model):
    title = models.CharField(max_length=255, default="Contact Us")
    address = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    website = models.URLField(blank=True, null=True)
    map_image = models.ImageField(
        upload_to="contact_maps/",
        blank=True,
        null=True,
        help_text="Upload map image instead of Google embed"
    )

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    REASON_CHOICES = [
        ("support", "Support"),
        ("sales", "Sales"),
        ("feedback", "Feedback"),
        ("other", "Other"),
    ]

    FIND_US_CHOICES = [
        ("google", "Google"),
        ("social", "Social Media"),
        ("friends", "Friends/Family"),
        ("ads", "Advertisement"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    reason = models.CharField(max_length=20, choices=REASON_CHOICES)
    find_us = models.CharField(max_length=20, choices=FIND_US_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.reason}"
    
class Bike(models.Model):
    title = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    year = models.IntegerField()
    km_driven = models.IntegerField()
    engine_cc = models.IntegerField()
    fuel_type = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    owner = models.CharField(max_length=50)
    image = models.ImageField(upload_to="bikes/")
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class BikeBookingStep(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='booking_steps/')

    def __str__(self):
        return self.title
    

class SellBanner(models.Model):
    image = models.ImageField(upload_to="sell_banners/")

    def __str__(self):
        return f"Sell Banner {self.id}"
    

class SellbikeCalculatorSection(models.Model):
    title = models.CharField(max_length=200)
    background_image = models.ImageField(upload_to='calculator_bg/')

    def __str__(self):
        return self.title
    
class HowItWorksCard(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="how_it_works/")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class HowItWorksSection(models.Model):
    section_title = models.CharField(max_length=255)
    background_color = models.CharField(max_length=7, default="#FFFFFF")  # hex color
    cards = models.ManyToManyField(HowItWorksCard)

    def __str__(self):
        return self.section_title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
    
class Payment(models.Model):
    PAYMENT_CHOICES = [
        ("credit_card", "Credit/Debit Card"),
        ("net_banking", "Net Banking"),
        ("gpay", "Gpay"),
        ("paytm", "Paytm"),
        ("phonepe", "PhonePe"),
        ("amazon_pay", "Amazon Pay"),
    ]

    bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name="payments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    bike_price = models.DecimalField(max_digits=10, decimal_places=2)
    gst = models.DecimalField(max_digits=10, decimal_places=2, default=1000)
    test_drive_amount = models.DecimalField(max_digits=10, decimal_places=2, default=1000)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.bike.title} - {self.total_amount}"