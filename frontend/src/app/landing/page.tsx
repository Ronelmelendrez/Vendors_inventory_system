"use client";

import {
  Navigation,
  HeroSection,
  FeaturesSection,
  BenefitsSection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
