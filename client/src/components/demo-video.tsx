import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DemoVideoProps {
  onVideoComplete?: () => void;
}

export function DemoVideo({ onVideoComplete }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Demo video content - simulating a professional walkthrough
  const videoScenes = [
    {
      time: 0,
      title: "Welcome, Executive",
      description: "Your digital empire starts here with strategic brand architecture"
    },
    {
      time: 12,
      title: "Seven Strategic Phases",
      description: "Navigate through battle-tested frameworks that separate industry leaders from everyone else"
    },
    {
      time: 24,
      title: "Executive-Level Assessments", 
      description: "Strategic questions designed for decision makers, not busywork for assistants"
    },
    {
      time: 36,
      title: "Multi-Prompt Navigation",
      description: "Progress through 3 strategic questions per phase with Previous/Next controls"
    },
    {
      time: 48,
      title: "Professional PDF Reports",
      description: "Generate comprehensive executive reports with logos, quotes, and actionable insights"
    },
    {
      time: 60,
      title: "Game-Like Achievement System",
      description: "Track progress through levels as you build your competitive advantage systematically"
    }
  ];

  const totalDuration = 75; // 75 seconds demo

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video playing
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / totalDuration) * 100);
          
          if (newTime >= totalDuration) {
            setIsPlaying(false);
            clearInterval(interval);
            onVideoComplete?.();
            return totalDuration;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const getCurrentScene = () => {
    return videoScenes.reduce((prev, current) => 
      currentTime >= current.time ? current : prev
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentScene = getCurrentScene();

  return (
    <Card className="neon-border bg-gradient-to-br from-deep-navy/90 to-dark-gray/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Video Display Area */}
        <div className="relative aspect-video bg-gradient-to-br from-deep-navy to-dark-gray flex items-center justify-center">
          {/* Simulated Video Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 animate-pulse"></div>
          
          {/* Video Content */}
          <div className="relative z-10 text-center px-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center mb-6 mx-auto">
              <div className="w-16 h-16 rounded-full bg-deep-navy flex items-center justify-center">
                {currentTime < 5 ? (
                  <div className="text-2xl font-bold text-neon-cyan">DB</div>
                ) : (
                  <div className="w-8 h-8 rounded bg-neon-cyan/20 animate-pulse"></div>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              {currentScene.title}
            </h3>
            <p className="text-light-gray text-lg max-w-md mx-auto">
              {currentScene.description}
            </p>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {videoScenes.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTime >= videoScenes[index].time 
                      ? 'bg-neon-cyan' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && currentTime === 0 && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                size="lg"
                className="w-20 h-20 rounded-full bg-neon-pink hover:bg-neon-pink/80 text-white shadow-2xl"
                data-testid="button-play-demo"
              >
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="bg-dark-gray/80 p-4">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="sm"
              className="text-white hover:text-neon-cyan"
              data-testid="button-toggle-play"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="w-full bg-gray-600 h-1 rounded-full">
                <div 
                  className="progress-indicator h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Time Display */}
            <div className="text-sm text-light-gray min-w-[60px]">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>

            {/* Volume */}
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-neon-cyan"
              data-testid="button-toggle-mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-neon-cyan"
              data-testid="button-fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}