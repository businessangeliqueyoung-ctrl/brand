import { useQuery } from "@tanstack/react-query";
import type { Section } from "@shared/schema";

export default function ProgressIndicator() {
  const { data: sections = [] } = useQuery<Section[]>({
    queryKey: ['/api/sections'],
  });

  // Mock completed sections count - in a real app this would come from user progress
  const completedSections = 0;
  const totalSections = sections.length || 7;
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <section id="progress" className="py-16 bg-dark-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-progress-title">
            Your Blueprint Progress
          </h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            Track your journey through the seven phases of digital brand mastery
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full bg-dark-gray h-2 rounded-full mb-8">
            <div 
              className="progress-indicator h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
              data-testid="progress-main-bar"
            ></div>
          </div>
          
          {/* Architectural Level Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {sections.map((section, index) => (
              <div key={section.id} className="text-center">
                <div 
                  className={`w-12 h-12 mx-auto rounded-lg neon-border flex items-center justify-center mb-2 transition-colors cursor-pointer ${
                    index < completedSections ? 'border-neon-pink' : 'border-gray-600'
                  }`}
                  data-testid={`level-indicator-${index + 1}`}
                >
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <div className="text-xs text-light-gray">Level {index + 1}</div>
              </div>
            ))}
          </div>
          
          {/* Progress Text */}
          <div className="text-center mt-8">
            <p className="text-light-gray" data-testid="text-progress-status">
              {completedSections} of {totalSections} sections completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
