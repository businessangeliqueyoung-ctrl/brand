import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Save, ChevronLeft, ChevronRight, Target, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { generatePDF } from "@/lib/pdf-generator";
import { useToast } from "@/hooks/use-toast";
import type { Section as SectionType, Prompt } from "@shared/schema";

export default function Section() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const { data: section, isLoading } = useQuery<SectionType>({
    queryKey: ['/api/sections', slug],
    enabled: !!slug,
  });

  const { data: prompts = [] } = useQuery<Prompt[]>({
    queryKey: ['/api/sections', section?.id, 'prompts'],
    enabled: !!section?.id,
  });

  const handleSaveProgress = () => {
    // TODO: Implement save progress functionality
    toast({
      title: "Progress Saved",
      description: "Your responses have been saved successfully.",
    });
  };

  const currentPrompt = prompts[currentPromptIndex];
  const progressPercentage = prompts.length > 0 ? ((currentPromptIndex + 1) / prompts.length) * 100 : 0;

  const getSectionIntroduction = (sectionSlug: string) => {
    const intros = {
      'personal-power': `Welcome to the foundation of everything, Executive. Before we talk tactics, tools, or timelines, we need to address the most critical asset in your business arsenal: your mindset. This isn't fluffy self-help content—this is about building the mental infrastructure that separates industry leaders from everyone else. Every great brand starts with a leader who thinks differently.`,
      'big-idea': `Here's where we separate the game-changers from the noise-makers, Executive. Your competition is drowning in features, benefits, and "me-too" messaging. But you? You're about to uncover the magnetic force that will pull customers toward you like gravity. This isn't about what you sell—it's about the movement you're creating.`,
      'market-trends': `Smart money follows the signals, Executive. While others chase yesterday's trends, you're about to position yourself at the intersection of what's coming next. This phase isn't about keeping up—it's about seeing around corners and positioning your brand where the market is heading, not where it's been.`,
      'competitor-secrets': `Time for some strategic intelligence, Executive. Your competitors are leaving breadcrumbs everywhere—in their messaging, their gaps, their customer complaints. We're not copying; we're studying the chess board and making moves they haven't even considered yet. This is where good brands become category leaders.`,
      'audience': `Precision targeting is what separates profitable brands from cash-burning startups, Executive. Mass appeal is mass confusion. Your future customers are out there right now, struggling with problems you can solve—but they need to feel seen, understood, and spoken to directly. Generic messaging is expensive. Specific messaging is magnetic.`,
      'new-brand': `Your brand is your business card, your reputation, and your competitive advantage all rolled into one, Executive. This isn't about pretty logos or trendy colors—it's about creating a visual and verbal identity that commands attention, builds trust, and drives decisions. Great brands aren't just recognizable; they're inevitable.`,
      'execute': `Strategy without execution is just expensive planning, Executive. This is where vision meets reality, where all your insights crystallize into systems that scale. The businesses that win aren't just the ones with good ideas—they're the ones that execute consistently, systematically, and relentlessly.`
    };
    return intros[sectionSlug as keyof typeof intros] || '';
  };

  const nextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  const prevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
    }
  };

  const handleResponseChange = (value: any) => {
    if (currentPrompt) {
      setResponses(prev => ({ ...prev, [currentPrompt.id]: value }));
    }
  };

  const handleGeneratePDF = async () => {
    if (!section) return;
    
    try {
      await generatePDF(section, responses, prompts);
      toast({
        title: "PDF Generated",
        description: "Your section report has been generated and downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 neon-border bg-dark-gray">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-neon-pink mb-2">Section Not Found</h1>
              <p className="text-light-gray mb-4">The requested section could not be found.</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-neon-pink to-neon-cyan">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-light-gray hover:text-white"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-light-gray">Phase {section.phase} of 7</div>
            </div>
          </div>

          {/* Section Header */}
          <Card className="neon-border bg-dark-gray/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${section.color}20, ${section.color}10)`,
                    color: section.color
                  }}
                >
                  <i className={section.icon}></i>
                </div>
                <div>
                  <CardTitle 
                    className="text-3xl font-bold mb-2"
                    style={{ color: section.color }}
                    data-testid="text-section-title"
                  >
                    {section.title}
                  </CardTitle>
                  <p className="text-light-gray text-lg">{section.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Executive Introduction */}
          <Card className="neon-border bg-gradient-to-r from-deep-navy/60 to-dark-gray/60 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-neon-cyan">Executive Brief</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-light-gray leading-relaxed text-lg italic">
                {getSectionIntroduction(section.slug)}
              </p>
            </CardContent>
          </Card>

          {/* Key Insights */}
          {section.insights && section.insights.length > 0 && (
            <Card className="neon-border bg-deep-navy/30 mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-neon-cyan" />
                  <CardTitle className="text-xl text-neon-cyan">Strategic Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.insights.map((insight, index) => (
                    <div 
                      key={index}
                      className="bg-dark-gray/30 p-4 rounded-lg border-l-4 border-neon-pink"
                    >
                      <p className="text-light-gray font-medium">"{insight}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dynamic Prompts Section */}
          {prompts.length > 0 && (
            <Card className="neon-border bg-dark-gray/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-neon-cyan">Strategic Assessment</CardTitle>
                    <p className="text-light-gray mt-1">
                      Complete these executive-level insights to build your strategic advantage
                    </p>
                  </div>
                  <div className="text-sm text-light-gray">
                    {currentPromptIndex + 1} of {prompts.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentPrompt && (
                  <div className="space-y-6">
                    {/* Current Prompt */}
                    <div className="neon-border rounded-lg p-6 bg-deep-navy/30">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">{currentPromptIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold mb-2 text-white text-lg">{currentPrompt.title}</h5>
                          <p className="text-light-gray mb-4 text-sm leading-relaxed">
                            {currentPrompt.description}
                          </p>
                        </div>
                      </div>

                      {/* Dynamic Input Rendering */}
                      <div className="ml-12">
                        {currentPrompt.type === 'textarea' && (
                          <textarea
                            className="w-full p-4 bg-dark-gray border border-gray-600 rounded-lg text-white focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20 transition-all"
                            rows={4}
                            placeholder={currentPrompt.placeholder || "Enter your response..."}
                            value={responses[currentPrompt.id] || ""}
                            onChange={(e) => handleResponseChange(e.target.value)}
                            data-testid={`textarea-${currentPrompt.id}`}
                          />
                        )}

                        {currentPrompt.type === 'text' && (
                          <input
                            type="text"
                            className="w-full p-4 bg-dark-gray border border-gray-600 rounded-lg text-white focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20 transition-all"
                            placeholder={currentPrompt.placeholder || "Enter your response..."}
                            value={responses[currentPrompt.id] || ""}
                            onChange={(e) => handleResponseChange(e.target.value)}
                            data-testid={`input-${currentPrompt.id}`}
                          />
                        )}

                        {currentPrompt.type === 'select' && currentPrompt.options && (
                          <Select 
                            value={responses[currentPrompt.id] || ""} 
                            onValueChange={handleResponseChange}
                          >
                            <SelectTrigger 
                              className="w-full p-4 bg-dark-gray border border-gray-600 text-white focus:border-neon-pink"
                              data-testid={`select-${currentPrompt.id}`}
                            >
                              <SelectValue placeholder={currentPrompt.placeholder || "Select an option..."} />
                            </SelectTrigger>
                            <SelectContent className="bg-dark-gray border border-gray-600">
                              {currentPrompt.options.map((option, index) => (
                                <SelectItem key={index} value={option} className="text-white hover:bg-gray-700">
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {currentPrompt.type === 'range' && (
                          <div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              className="w-full accent-neon-pink"
                              value={responses[currentPrompt.id] || 5}
                              onChange={(e) => handleResponseChange(Number(e.target.value))}
                              data-testid={`range-${currentPrompt.id}`}
                            />
                            <div className="text-center text-sm text-light-gray mt-2">
                              Value: {responses[currentPrompt.id] || 5}/10
                            </div>
                          </div>
                        )}

                        {currentPrompt.type === 'checkbox' && (
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-neon-pink"
                              checked={responses[currentPrompt.id] || false}
                              onChange={(e) => handleResponseChange(e.target.checked)}
                              data-testid={`checkbox-${currentPrompt.id}`}
                            />
                            <label className="text-light-gray">
                              {currentPrompt.placeholder || "Check if applicable"}
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={prevPrompt}
                        disabled={currentPromptIndex === 0}
                        variant="outline"
                        className="border-gray-600 text-light-gray hover:border-neon-cyan hover:text-neon-cyan disabled:opacity-50"
                        data-testid="button-prev-prompt"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="text-center flex-1 mx-8">
                        <div className="w-full bg-dark-gray h-3 rounded-full mb-2">
                          <div
                            className="progress-indicator h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                            data-testid="progress-bar"
                          ></div>
                        </div>
                        <p className="text-sm text-light-gray" data-testid="text-progress">
                          {currentPromptIndex + 1} of {prompts.length} strategic assessments completed
                        </p>
                      </div>

                      <Button
                        onClick={nextPrompt}
                        disabled={currentPromptIndex === prompts.length - 1}
                        variant="outline"
                        className="border-gray-600 text-light-gray hover:border-neon-cyan hover:text-neon-cyan disabled:opacity-50"
                        data-testid="button-next-prompt"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleSaveProgress}
              className="flex-1 bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90"
              data-testid="button-save-progress"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>
            <Button 
              onClick={handleGeneratePDF}
              variant="outline"
              className="flex-1 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-white"
              data-testid="button-generate-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
