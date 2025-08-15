import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import type { Section } from "@shared/schema";

export default function CoreSections() {
  const { data: sections = [], isLoading } = useQuery<Section[]>({
    queryKey: ['/api/sections'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sections" className="py-20 bg-deep-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-sections-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
              Seven Phases of Brand Mastery
            </span>
          </h2>
          <p className="text-xl text-light-gray max-w-3xl mx-auto">
            Each phase contains detailed prompts, strategic insights, and actionable frameworks 
            to transform your brand from vision to magnetic digital presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {sections.map((section) => (
            <Link key={section.id} href={`/section/${section.slug}`}>
              <Card 
                className="neon-border neon-border-hover rounded-xl bg-dark-gray/50 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                data-testid={`card-section-${section.slug}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${section.color}20, ${section.color}10)`,
                        color: section.color
                      }}
                    >
                      <i className={section.icon}></i>
                    </div>
                    <div className="text-sm text-light-gray">Phase {section.phase}</div>
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: section.color }}
                    data-testid={`text-section-title-${section.slug}`}
                  >
                    {section.title}
                  </h3>
                  
                  <p className="text-light-gray mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-light-gray">
                      <i className="fas fa-tasks"></i>
                      <span data-testid={`text-prompt-count-${section.slug}`}>
                        {section.promptCount} Prompts
                      </span>
                    </div>
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ borderColor: section.color }}
                      data-testid={`completion-indicator-${section.slug}`}
                    >
                      <Circle className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
