import { Button } from "@/components/ui/button";
import backgroundImage from "@assets/futuristic-digital-city.jpg";
git add client/src/components/hero-section.tsx
git commit -m "Fix hero image path for Vercel build"
git push origin main
";

interface HeroSectionProps {
  onShowDemo?: () => void;
}

export default function HeroSection({ onShowDemo }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Futuristic city background with architectural elements */}
      <div className="absolute inset-0 architectural-grid opacity-30"></div>
      
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-deep-navy/70"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Floating architectural elements */}
      <div className="absolute inset-0 z-10">
        <div className="w-64 h-64 border border-neon-pink/20 rounded-lg absolute top-20 left-10 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="w-48 h-48 border border-neon-cyan/20 rounded-lg absolute bottom-32 right-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="w-32 h-32 border border-electric-blue/20 rounded-lg absolute top-1/2 left-1/3 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center mb-6 animate-pulse-neon">
            <span className="text-white font-bold text-2xl">db</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-main-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
              Digital Branding Blueprint
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-light-gray mb-8 leading-relaxed" data-testid="text-main-subtitle">
            Master Your Digital Brand in today's competitive, fast-moving digital world. 
            Transform your vision into a magnetic digital presence that actually works.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105"
            data-testid="button-begin-journey"
          >
            Begin Your Journey
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onShowDemo}
            className="px-8 py-4 border-neon-cyan text-neon-cyan font-semibold text-lg hover:bg-neon-cyan hover:text-white transition-all"
            data-testid="button-watch-demo"
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-pink mb-2" data-testid="text-stat-sections">7</div>
            <div className="text-light-gray">Core Sections</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan mb-2" data-testid="text-stat-prompts">100+</div>
            <div className="text-light-gray">Strategic Prompts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-electric-blue mb-2" data-testid="text-stat-potential">∞</div>
            <div className="text-light-gray">Brand Potential</div>
          </div>
        </div>
      </div>
    </section>
  );
}
