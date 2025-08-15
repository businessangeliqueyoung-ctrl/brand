import { useState } from 'react';
import { Play, Target, TrendingUp, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OnboardingWelcomeProps {
  onStartDemo: () => void;
  onStartJourney: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({ onStartDemo, onStartJourney, onSkip }: OnboardingWelcomeProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="neon-border bg-gradient-to-br from-deep-navy/95 to-dark-gray/95 backdrop-blur-sm max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center mb-6">
            <span className="text-white font-bold text-2xl">DB</span>
          </div>
          
          <CardTitle className="text-4xl font-bold text-white mb-4">
            Welcome to Your Digital Empire
          </CardTitle>
          
          <p className="text-light-gray text-xl max-w-3xl mx-auto leading-relaxed">
            You've just entered the strategic command center used by industry leaders to build 
            magnetic digital brands. This isn't marketing fluff—it's your competitive advantage.
          </p>

          <div className="flex justify-between items-center mt-6">
            <Badge variant="outline" className="border-neon-pink text-neon-pink">
              Executive Edition
            </Badge>
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-light-gray hover:text-white text-sm"
              data-testid="button-skip-welcome"
            >
              Skip Introduction
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* What You'll Master */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-dark-gray/30 rounded-lg neon-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Strategic Mindset</h3>
              <p className="text-sm text-light-gray">
                Build the executive mindset that separates industry leaders from everyone else
              </p>
            </div>

            <div className="text-center p-6 bg-dark-gray/30 rounded-lg neon-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Market Intelligence</h3>
              <p className="text-sm text-light-gray">
                Position yourself where the market is heading, not where it's been
              </p>
            </div>

            <div className="text-center p-6 bg-dark-gray/30 rounded-lg neon-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Precision Targeting</h3>
              <p className="text-sm text-light-gray">
                Speak directly to decision makers who need what you're building
              </p>
            </div>

            <div className="text-center p-6 bg-dark-gray/30 rounded-lg neon-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Systematic Execution</h3>
              <p className="text-sm text-light-gray">
                Transform strategy into systems that scale and compound over time
              </p>
            </div>
          </div>

          {/* The Strategic Framework */}
          <div className="bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              The Seven-Phase Strategic Framework
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { phase: 1, name: "Personal Power", desc: "Executive mindset foundation" },
                  { phase: 2, name: "Big Idea", desc: "Magnetic value proposition" },
                  { phase: 3, name: "Market Trends", desc: "Future positioning strategy" },
                  { phase: 4, name: "Competitor Intelligence", desc: "Strategic advantage mapping" }
                ].map((item) => (
                  <div key={item.phase} className="flex items-center space-x-4 p-4 bg-dark-gray/40 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center text-white font-bold text-sm">
                      {item.phase}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-sm text-light-gray">{item.desc}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { phase: 5, name: "Audience Insights", desc: "Precision customer targeting" },
                  { phase: 6, name: "Brand Identity", desc: "Visual & verbal dominance" },
                  { phase: 7, name: "Execution Systems", desc: "Scalable implementation" }
                ].map((item) => (
                  <div key={item.phase} className="flex items-center space-x-4 p-4 bg-dark-gray/40 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center text-white font-bold text-sm">
                      {item.phase}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-sm text-light-gray">{item.desc}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ))}
                
                {/* Placeholder for completion */}
                <div className="flex items-center justify-center p-6 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-lg border-2 border-dashed border-neon-cyan/50">
                  <div className="text-center">
                    <Award className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                    <p className="text-neon-cyan font-semibold">Digital Empire Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Makes This Different */}
          <div className="bg-dark-gray/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">What Makes This Different</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-neon-cyan mb-2">Executive-Level Content</h4>
                <p className="text-sm text-light-gray">
                  Strategic questions designed for decision makers, not generic marketing surveys
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neon-cyan mb-2">Professional Outputs</h4>
                <p className="text-sm text-light-gray">
                  Generate comprehensive PDF reports you can share with stakeholders and teams
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neon-cyan mb-2">Systematic Progression</h4>
                <p className="text-sm text-light-gray">
                  Game-like achievement system that builds momentum through strategic milestones
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-deep-navy/60 to-dark-gray/60 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h3>
            <p className="text-light-gray mb-8 max-w-2xl mx-auto">
              Choose your path: Watch a strategic walkthrough of the platform, 
              or dive directly into Phase 1 and start building your competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                onClick={onStartDemo}
                size="lg"
                variant="outline"
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-white px-8 py-3"
                data-testid="button-start-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Strategic Demo
              </Button>
              
              <Button
                onClick={onStartJourney}
                size="lg"
                className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white px-8 py-3"
                data-testid="button-begin-phase-1"
              >
                Begin Phase 1: Personal Power
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-light-gray mt-6">
              <span className="text-neon-cyan">Pro Tip:</span> The demo takes 75 seconds and shows you 
              exactly how industry leaders use this framework to dominate their markets.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}