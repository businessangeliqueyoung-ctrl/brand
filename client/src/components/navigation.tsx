import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { useState } from "react";
import logoPath from "@assets/Simple Aesthetic Elegant Minimalist Logo_1755208304904.png";

interface NavigationProps {
  onShowOnboarding?: () => void;
}

export default function Navigation({ onShowOnboarding }: NavigationProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-deep-navy/80 backdrop-blur-md neon-border border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center">
              <span className="text-white font-bold text-lg">db</span>
            </div>
            <span className="text-xl font-semibold">Digital Branding Blueprint</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#sections" 
              className="text-light-gray hover:text-neon-cyan transition-colors"
              data-testid="link-sections"
            >
              Sections
            </a>
            <a 
              href="#progress" 
              className="text-light-gray hover:text-neon-cyan transition-colors"
              data-testid="link-progress"
            >
              Progress
            </a>
            <Button 
              variant="outline"
              onClick={onShowOnboarding}
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-white"
              data-testid="button-demo-video"
            >
              Watch Demo
            </Button>
            <Button 
              className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            size="sm"
            className="md:hidden text-light-gray hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-gray/95 backdrop-blur-sm border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#sections"
                className="block px-3 py-2 text-light-gray hover:text-neon-cyan transition-colors"
                data-testid="mobile-link-sections"
              >
                Sections
              </a>
              <a 
                href="#progress"
                className="block px-3 py-2 text-light-gray hover:text-neon-cyan transition-colors"
                data-testid="mobile-link-progress"
              >
                Progress
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button 
                  variant="outline"
                  onClick={onShowOnboarding}
                  className="w-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-white"
                  data-testid="mobile-button-demo-video"
                >
                  Watch Demo
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90"
                  data-testid="mobile-button-get-started"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
