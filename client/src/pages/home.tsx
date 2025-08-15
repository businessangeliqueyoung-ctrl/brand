import { useState, useEffect } from 'react';
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProgressIndicator from "@/components/progress-indicator";
import CoreSections from "@/components/core-sections";
import FeaturesShowcase from "@/components/features-showcase";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { OnboardingWelcome } from "@/components/onboarding-welcome";
import { DemoModal } from "@/components/demo-modal";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('dbp_onboarding_complete');
    if (!hasSeenOnboarding) {
      // Show welcome screen after a brief delay for better UX
      const timer = setTimeout(() => setShowWelcome(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('dbp_onboarding_complete', 'true');
    setShowOnboarding(false);
    // Redirect to first section or show success message
    window.location.href = '/section/personal-power';
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem('dbp_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  const handleShowDemo = () => {
    setShowDemo(true);
  };

  const handleWelcomeDemo = () => {
    setShowWelcome(false);
    setShowDemo(true);
  };

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  const handleWelcomeSkip = () => {
    localStorage.setItem('dbp_onboarding_complete', 'true');
    setShowWelcome(false);
  };

  const handleDemoComplete = () => {
    setShowDemo(false);
    setShowOnboarding(true);
  };

  return (
    <>
      <Navigation onShowOnboarding={handleShowDemo} />
      <HeroSection onShowDemo={handleShowDemo} />
      <ProgressIndicator />
      <CoreSections />
      <FeaturesShowcase />
      <CTASection />
      <Footer />
      
      {showWelcome && (
        <OnboardingWelcome
          onStartDemo={handleWelcomeDemo}
          onStartJourney={handleWelcomeStart}
          onSkip={handleWelcomeSkip}
        />
      )}
      
      {showDemo && (
        <DemoModal
          isOpen={showDemo}
          onClose={() => setShowDemo(false)}
          onComplete={handleDemoComplete}
        />
      )}
      
      {showOnboarding && (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      )}
    </>
  );
}
