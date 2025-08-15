import { useState, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TutorialStep {
  id: string;
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  arrow: 'up' | 'down' | 'left' | 'right';
}

interface TutorialOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
  steps: TutorialStep[];
}

export function TutorialOverlay({ isActive, onComplete, onSkip, steps }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !steps[currentStep]) return;

    const target = document.querySelector(`[data-testid="${steps[currentStep].target}"]`) as HTMLElement;
    setTargetElement(target);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.position = 'relative';
      target.style.zIndex = '1000';
    }
  }, [currentStep, isActive, steps]);

  if (!isActive || !targetElement || !steps[currentStep]) return null;

  const currentTutorialStep = steps[currentStep];
  const rect = targetElement.getBoundingClientRect();
  
  const getOverlayPosition = () => {
    const padding = 20;
    switch (currentTutorialStep.position) {
      case 'top':
        return {
          top: rect.top - 200 - padding,
          left: rect.left + rect.width / 2 - 200,
        };
      case 'bottom':
        return {
          top: rect.bottom + padding,
          left: rect.left + rect.width / 2 - 200,
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2 - 100,
          left: rect.left - 420 - padding,
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2 - 100,
          left: rect.right + padding,
        };
      default:
        return { top: rect.bottom + padding, left: rect.left };
    }
  };

  const overlayPosition = getOverlayPosition();
  const ArrowIcon = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight,
  }[currentTutorialStep.arrow];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[999]" />
      
      {/* Highlight Target */}
      <div
        className="fixed border-2 border-neon-cyan rounded-lg shadow-lg shadow-neon-cyan/50 z-[1001] pointer-events-none"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />
      
      {/* Tutorial Card */}
      <Card
        className="fixed neon-border bg-deep-navy/95 backdrop-blur-sm w-96 z-[1002]"
        style={overlayPosition}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{currentTutorialStep.title}</h3>
                <p className="text-xs text-light-gray">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <Button
              onClick={onSkip}
              variant="ghost"
              size="sm"
              className="text-light-gray hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-light-gray mb-6 leading-relaxed">
            {currentTutorialStep.description}
          </p>

          {/* Arrow Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 flex items-center justify-center">
              <ArrowIcon className="w-5 h-5 text-neon-cyan animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
              className="border-gray-600 text-light-gray hover:border-neon-cyan hover:text-neon-cyan disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-neon-cyan' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              size="sm"
              className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Predefined tutorial sequences
export const homeTutorialSteps: TutorialStep[] = [
  {
    id: 'hero-title',
    target: 'text-main-title',
    title: 'Welcome to Your Digital Empire',
    description: 'This is the Digital Branding Blueprint - your strategic command center for building a magnetic digital presence that actually works.',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'demo-button',
    target: 'button-watch-demo',
    title: 'Watch the Strategic Demo',
    description: 'See exactly how industry leaders use this 7-phase framework to dominate their markets. The demo takes just 75 seconds.',
    position: 'top',
    arrow: 'up'
  },
  {
    id: 'start-button',
    target: 'button-begin-journey',
    title: 'Begin Your Strategic Journey',
    description: 'Ready to dive in? This button takes you directly to Phase 1: Personal Power - the foundation of executive leadership.',
    position: 'top',
    arrow: 'up'
  },
  {
    id: 'sections-overview',
    target: 'text-stat-sections',
    title: 'Seven Strategic Phases',
    description: 'Each phase builds upon the last, creating a comprehensive strategy that transforms vision into market dominance.',
    position: 'top',
    arrow: 'up'
  }
];

export const sectionTutorialSteps: TutorialStep[] = [
  {
    id: 'section-header',
    target: 'text-section-title',
    title: 'Strategic Phase Overview',
    description: 'Each section represents a critical phase in your brand development journey. Focus on one phase at a time for maximum impact.',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'prompt-navigation',
    target: 'button-next-prompt',
    title: 'Navigate Through Questions',
    description: 'Use Previous and Next buttons to move through strategic questions. Each question is designed to unlock specific insights.',
    position: 'left',
    arrow: 'left'
  },
  {
    id: 'progress-bar',
    target: 'progress-bar',
    title: 'Track Your Progress',
    description: 'Watch your progress as you complete strategic assessments. The visual feedback keeps you motivated and on track.',
    position: 'bottom',
    arrow: 'down'
  },
  {
    id: 'pdf-generation',
    target: 'button-generate-pdf',
    title: 'Generate Professional Reports',
    description: 'Once you complete a section, generate comprehensive PDF reports you can share with stakeholders and team members.',
    position: 'top',
    arrow: 'up'
  }
];