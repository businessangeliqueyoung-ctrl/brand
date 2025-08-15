import { Link } from "wouter";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-deep-navy border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center">
                <span className="text-white font-bold text-lg">db</span>
              </div>
              <span className="text-xl font-semibold">Digital Branding Blueprint</span>
            </Link>
            <p className="text-light-gray mb-4 max-w-md" data-testid="text-footer-description">
              The comprehensive framework for building magnetic digital brands that actually work. 
              Transform your vision into reality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-gray hover:text-neon-pink transition-colors" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-light-gray hover:text-electric-blue transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-documentation">Documentation</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-templates">Templates</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-case-studies">Case Studies</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-blog">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-help-center">Help Center</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-contact">Contact</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-community">Community</a></li>
              <li><a href="#" className="text-light-gray hover:text-neon-cyan transition-colors" data-testid="link-faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-light-gray text-sm" data-testid="text-copyright">
            © 2024 Digital Branding Blueprint. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-light-gray hover:text-white text-sm transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="text-light-gray hover:text-white text-sm transition-colors" data-testid="link-terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
