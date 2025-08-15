import { Button } from "@/components/ui/button";
import futuristicCity from "../assets/futuristic-digital-city-stockcake.jpg";


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
        <div
          className="w-64 h-64 border border-neon-pink/20 rounded-lg absolute top-20 left-10 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-48 h-48 border border-neon-cyan/20 rounded-lg absolute bottom-32 right-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="w-32 h-32 border border-electric-blue/20 rounded-lg absolute top-1/2 left-1/3 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center mb-6 animate-pulse-neon">
            <span className="text-white font-bold text-2xl">db</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-main-title"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
              Digital Branding Blueprint
            </span>
          </h1>

          <p
            className="text-xl sm:text-2xl text-light-gray mb-8 leading-relaxed"
            data-testid="text-main-subtitle"
          >
            Master Your Digital Brand in today's competitive, fast-moving digital world.  
            Transform your ideas into powerful strategies.
          </p>

          {onShowDemo && (
            <Button
              onClick={onShowDemo}
              className="px-8 py-4 text-lg font-semibold"
            >
              See Demo
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
