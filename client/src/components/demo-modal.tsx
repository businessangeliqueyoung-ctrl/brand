import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoVideo } from './demo-video';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function DemoModal({ isOpen, onClose, onComplete }: DemoModalProps) {
  if (!isOpen) return null;

  const handleVideoComplete = () => {
    onComplete?.();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute -top-12 right-0 text-white hover:text-neon-cyan z-10"
          data-testid="button-close-demo"
        >
          <X className="w-6 h-6" />
        </Button>
        
        {/* Demo Video Component */}
        <DemoVideo onVideoComplete={handleVideoComplete} />
        
        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-light-gray mb-4">
            Ready to transform your digital brand with this strategic framework?
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white px-8"
              data-testid="button-start-after-demo"
            >
              Start Your Journey Now
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-light-gray hover:border-neon-cyan hover:text-neon-cyan px-8"
              data-testid="button-close-demo-alt"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}