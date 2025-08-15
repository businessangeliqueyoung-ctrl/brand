import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-deep-navy via-dark-gray to-deep-navy relative overflow-hidden">
      <div className="absolute inset-0 architectural-grid opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="text-cta-title">
          Ready to Master Your 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
            Digital Brand?
          </span>
        </h2>
        <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
          Join thousands of entrepreneurs who have transformed their vision into magnetic digital presence using our proven blueprint.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105"
            data-testid="button-start-blueprint"
          >
            Start Your Blueprint
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 border-neon-cyan text-neon-cyan font-semibold text-lg hover:bg-neon-cyan hover:text-white transition-all"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-neon-pink mb-2" data-testid="text-stat-transformed">5,000+</div>
            <div className="text-light-gray text-sm">Brands Transformed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neon-cyan mb-2" data-testid="text-stat-success-rate">98%</div>
            <div className="text-light-gray text-sm">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-electric-blue mb-2" data-testid="text-stat-completion">30 Days</div>
            <div className="text-light-gray text-sm">Average Completion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
