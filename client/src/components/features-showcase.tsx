import { Brain, FileText, TrendingUp, Smartphone, FolderSync, Lightbulb } from "lucide-react";

export default function FeaturesShowcase() {
  const features = [
    {
      icon: Brain,
      title: "Strategic Prompts",
      description: "100+ carefully crafted questions to unlock your brand's potential and clarify your unique positioning",
      color: "text-neon-pink"
    },
    {
      icon: FileText,
      title: "PDF Generation",
      description: "Generate comprehensive brand strategy documents and implementation guides based on your responses",
      color: "text-neon-cyan"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visual progress indicators and milestone achievements to keep you motivated throughout your journey",
      color: "text-electric-blue"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Complete your brand development on any device with our responsive, touch-friendly interface",
      color: "text-purple-400"
    },
    {
      icon: FolderSync,
      title: "Real-time FolderSync",
      description: "Your progress automatically saves and syncs across all your devices for seamless workflow",
      color: "text-green-400"
    },
    {
      icon: Lightbulb,
      title: "Expert Insights",
      description: "Get personalized recommendations and insights based on your industry and business model",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="py-20 bg-dark-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-features-title">
            Comprehensive Brand Development System
          </h2>
          <p className="text-xl text-light-gray max-w-3xl mx-auto">
            Every tool, template, and strategic framework you need to build a magnetic digital presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6" data-testid={`feature-card-${index}`}>
              <div 
                className={`w-16 h-16 mx-auto mb-6 rounded-xl ${feature.color.replace('text-', 'bg-')}/20 flex items-center justify-center`}
              >
                <feature.icon className={`${feature.color} text-2xl w-8 h-8`} />
              </div>
              <h3 className="text-xl font-semibold mb-4" data-testid={`feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-light-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
