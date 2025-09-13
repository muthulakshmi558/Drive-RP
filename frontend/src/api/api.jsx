import axios from "axios";

const API = axios.create({
  baseURL: "https://drive-rp.onrender.com/api",
});

const endpoints = {
  // Existing
  homeBanner: "/home-banner/",
  infoSection: "/infosection/",
  about: "/about/",
  supportFeatures: "/support-features/",
  featuredBikes: "/featured-bikes/",
  features: "/features/",
  testimonials: "/testimonials/",
  riderStory: "/rider-stories/",
  approach: "/approach/",
  contactInfo: "/contact-info/",
  contactMessage: "/contact-message/",
  bikes: "/bikes/",
  filters: "/filters/",
  bookingSteps: "/booking-steps/",
  sellBanner: "/sell-banner/",
  calculatorSection: "/calculator-section/",
  howItWorksSection: "/how-it-works-section/",

  // 👇 Add these
  register: "/auth/register/",
  login: "/auth/login/",
};

export default API;
export { endpoints };
