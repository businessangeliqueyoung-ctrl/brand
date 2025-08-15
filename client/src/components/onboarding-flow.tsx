import { useState } from 'react';
import { ChevronRight, ChevronLeft, Target, Lightbulb, TrendingUp, Users, Palette, Rocket, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Your Digital Empire',
      subtitle: 'Executive-level brand strategy awaits',
      icon: Target,
      content: {
        headline: 'Transform Your Vision Into Market Dominance',
        description: 'You\'re about to embark on a strategic journey used by industry leaders to build magnetic digital brands. This isn\'t just another marketing tool—it\'s your competitive advantage.',
        keyPoints: [
          'Seven proven phases of brand development',
          'Executive-level strategic assessments', 
          'Professional PDF reports for stakeholders',
          'Game-like progression tracking'
        ],
        cta: 'Ready to begin your transformation?'
      }
    },
    {
      id: 'how-it-works',
      title: 'Your Strategic Roadmap',
      subtitle: 'Seven phases to digital dominance',
      icon: Rocket,
      content: {
        headline: 'A Systematic Approach to Brand Excellence',
        description: 'Each phase builds upon the last, creating a comprehensive digital brand strategy that commands attention and drives results.',
        phases: [
          { name: 'Personal Power', description: 'Build executive mindset', color: 'from-red-500 to-pink-500' },
          { name: 'Big Idea', description: 'Uncover your magnetic force', color: 'from-orange-500 to-yellow-500' },
          { name: 'Market Trends', description: 'Position for the future', color: 'from-green-500 to-emerald-500' },
          { name: 'Competitor Secrets', description: 'Strategic intelligence', color: 'from-blue-500 to-cyan-500' },
          { name: 'Audience Insights', description: 'Precision targeting', color: 'from-purple-500 to-violet-500' },
          { name: 'Brand Identity', description: 'Visual & verbal power', color: 'from-pink-500 to-rose-500' },
          { name: 'Execution Plan', description: 'Systems that scale', color: 'from-indigo-500 to-blue-500' }
        ],
        cta: 'Each phase unlocks your next level of success'
      }
    },
    {
      id: 'assessment-preview',
      title: 'Strategic Assessments',
      subtitle: 'Executive-caliber insights',
      icon: Lightbulb,
      content: {
        headline: 'Assessments Designed for Decision Makers',
        description: 'Answer strategic questions that uncover insights, reveal opportunities, and guide your brand development with precision.',
        examples: [
          {
            question: 'What limiting beliefs are constraining your market position?',
            type: 'Deep strategic reflection'
          },
          {
            question: 'Rate your competitive advantage in emerging markets (1-10)',
            type: 'Quantitative assessment'
          },
          {
            question: 'Which market segment represents your highest value opportunity?',
            type: 'Strategic selection'
          }
        ],
        cta: 'Your insights drive your strategy'
      }
    },
    {
      id: 'progress-tracking',
      title: 'Game-Like Progression',
      subtitle: 'Level up your business success',
      icon: TrendingUp,
      content: {
        headline: 'Achievement Unlocks Excellence',
        description: 'Track your progress through each phase with architectural precision. Watch your brand strategy evolve as you complete assessments and unlock insights.',
        features: [
          'Real-time progress visualization',
          'Phase completion milestones',
          'Strategic insight collection',
          'Professional PDF generation',
          'Executive action planning'
        ],
        cta: 'Success is systematic, not accidental'
      }
    },
    {
      id: 'get-started',
      title: 'Begin Your Journey',
      subtitle: 'Your digital empire awaits',
      icon: CheckCircle,
      content: {
        headline: 'Time to Build Your Competitive Advantage',
        description: 'You now understand the strategic framework. Your next step is to begin Phase 1: Unblock Your Personal Power and start building the mindset that separates industry leaders from everyone else.',
        nextSteps: [
          'Start with Phase 1: Personal Power Assessment',
          'Complete strategic questions at your own pace',
          'Generate your first executive report',
          'Build momentum through systematic progression'
        ],
        cta: 'Ready to transform your digital presence?'
      }
    }
  ];

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
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

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="neon-border bg-gradient-to-br from-deep-navy/95 to-dark-gray/95 backdrop-blur-sm max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <CardHeader className="relative pb-4">
          {/* Progress Indicators */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-neon-cyan scale-125' 
                      : index < currentStep
                      ? 'bg-neon-pink'
                      : 'bg-gray-600'
                  }`}
                  data-testid={`step-indicator-${index}`}
                />
              ))}
            </div>
            
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-light-gray hover:text-white text-sm"
              data-testid="button-skip-onboarding"
            >
              Skip Tour
            </Button>
          </div>

          {/* Step Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">{currentStepData.title}</CardTitle>
              <p className="text-light-gray">{currentStepData.subtitle}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <div className="min-h-[400px]">
            {/* Step 1: Welcome */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {currentStepData.content.headline}
                  </h3>
                  <p className="text-light-gray text-lg max-w-2xl mx-auto leading-relaxed">
                    {currentStepData.content.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  {currentStepData.content.keyPoints?.map((point, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-dark-gray/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-neon-pink flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-light-gray">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <p className="text-neon-cyan font-medium text-lg italic">
                    {currentStepData.content.cta}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: How It Works */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {currentStepData.content.headline}
                  </h3>
                  <p className="text-light-gray text-lg max-w-2xl mx-auto">
                    {currentStepData.content.description}
                  </p>
                </div>

                <div className="grid gap-3">
                  {currentStepData.content.phases?.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-dark-gray/30 rounded-lg hover:bg-dark-gray/50 transition-all">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{phase.name}</h4>
                        <p className="text-light-gray text-sm">{phase.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-neon-cyan/20 text-neon-cyan">
                        Phase {index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <p className="text-neon-cyan font-medium italic">
                    {currentStepData.content.cta}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Assessment Preview */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {currentStepData.content.headline}
                  </h3>
                  <p className="text-light-gray text-lg max-w-2xl mx-auto">
                    {currentStepData.content.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentStepData.content.examples?.map((example, index) => (
                    <div key={index} className="p-6 bg-dark-gray/30 rounded-lg neon-border">
                      <div className="flex items-start space-x-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-lg mb-2">"{example.question}"</p>
                          <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                            {example.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <p className="text-neon-cyan font-medium italic">
                    {currentStepData.content.cta}
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Progress Tracking */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {currentStepData.content.headline}
                  </h3>
                  <p className="text-light-gray text-lg max-w-2xl mx-auto">
                    {currentStepData.content.description}
                  </p>
                </div>

                {/* Mock Progress Visual */}
                <div className="bg-dark-gray/30 p-6 rounded-lg neon-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Your Progress</h4>
                    <Badge className="bg-neon-pink text-white">Level 3 of 7</Badge>
                  </div>
                  <div className="w-full bg-gray-600 h-3 rounded-full mb-4">
                    <div className="progress-indicator h-3 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-deep-navy/50 rounded">
                      <div className="text-2xl font-bold text-neon-cyan">2</div>
                      <div className="text-xs text-light-gray">Completed</div>
                    </div>
                    <div className="p-3 bg-deep-navy/50 rounded">
                      <div className="text-2xl font-bold text-neon-pink">1</div>
                      <div className="text-xs text-light-gray">In Progress</div>
                    </div>
                    <div className="p-3 bg-deep-navy/50 rounded">
                      <div className="text-2xl font-bold text-white">4</div>
                      <div className="text-xs text-light-gray">Remaining</div>
                    </div>
                    <div className="p-3 bg-deep-navy/50 rounded">
                      <div className="text-2xl font-bold text-neon-cyan">3</div>
                      <div className="text-xs text-light-gray">PDFs Generated</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {currentStepData.content.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-dark-gray/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                      <span className="text-light-gray">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <p className="text-neon-cyan font-medium italic">
                    {currentStepData.content.cta}
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Get Started */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {currentStepData.content.headline}
                  </h3>
                  <p className="text-light-gray text-lg max-w-2xl mx-auto">
                    {currentStepData.content.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentStepData.content.nextSteps?.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 p-6 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-lg">
                  <p className="text-neon-cyan font-semibold text-xl mb-4">
                    {currentStepData.content.cta}
                  </p>
                  <Button
                    onClick={onComplete}
                    size="lg"
                    className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white font-bold px-8 py-3"
                    data-testid="button-start-journey"
                  >
                    Begin Phase 1: Personal Power
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-600">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="border-gray-600 text-light-gray hover:border-neon-cyan hover:text-neon-cyan disabled:opacity-50"
              data-testid="button-prev-step"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <span className="text-light-gray text-sm">
                {currentStep + 1} of {onboardingSteps.length}
              </span>
            </div>

            {currentStep < onboardingSteps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white"
                data-testid="button-next-step"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onComplete}
                className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white"
                data-testid="button-complete-onboarding"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}