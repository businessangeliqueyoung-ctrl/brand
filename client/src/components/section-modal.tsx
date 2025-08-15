import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Save, Download, ArrowRight } from "lucide-react";
import type { Section } from "@shared/schema";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: Section | null;
  onSaveProgress: () => void;
  onGeneratePDF: () => void;
  onNextSection: () => void;
}

export default function SectionModal({ 
  isOpen, 
  onClose, 
  section, 
  onSaveProgress, 
  onGeneratePDF, 
  onNextSection 
}: SectionModalProps) {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-gray neon-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
              style={{ 
                background: `linear-gradient(135deg, ${section.color}20, ${section.color}10)`,
                color: section.color
              }}
            >
              <i className={section.icon}></i>
            </div>
            <div>
              <DialogTitle 
                className="text-2xl font-bold"
                style={{ color: section.color }}
                data-testid="modal-section-title"
              >
                {section.title}
              </DialogTitle>
              <p className="text-light-gray">Phase {section.phase} of 7</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-light-gray hover:text-white"
            data-testid="button-close-modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="p-6">
          {/* Phase Overview */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 text-neon-cyan">Phase Overview</h4>
            <p className="text-light-gray mb-4">
              {section.description}
            </p>
            {section.insights && section.insights[0] && (
              <div className="bg-deep-navy/50 p-4 rounded-lg">
                <p className="text-sm text-light-gray italic">
                  "{section.insights[0]}"
                </p>
              </div>
            )}
          </div>

          {/* Prompts Section */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-6 text-neon-cyan">Strategic Prompts & Insights</h4>
            
            <div className="space-y-6">
              <div className="neon-border rounded-lg p-6 bg-deep-navy/30">
                <h5 className="font-semibold mb-3 text-white">Self-Awareness Check In</h5>
                <p className="text-light-gray mb-4 text-sm">
                  Complete this reflection to identify your current state and areas for growth.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">What limiting beliefs are holding you back?</label>
                    <textarea 
                      className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg text-white focus:border-neon-pink focus:outline-none" 
                      rows={3} 
                      placeholder="Describe your current challenges..."
                      data-testid="modal-textarea-limiting-beliefs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rate your confidence level (1-10)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      className="w-full accent-neon-pink"
                      data-testid="modal-input-confidence-level"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-light-gray mb-4">Complete all prompts to unlock insights and generate your PDF report</p>
                <div className="w-full bg-dark-gray h-2 rounded-full mb-4">
                  <div className="bg-gradient-to-r from-neon-pink to-neon-cyan h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
                <p className="text-sm text-light-gray" data-testid="modal-progress-text">
                  1 of {section.promptCount} prompts completed
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onSaveProgress}
              className="flex-1 bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90"
              data-testid="modal-button-save-progress"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>
            <Button 
              onClick={onGeneratePDF}
              variant="outline"
              className="flex-1 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-white"
              data-testid="modal-button-generate-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF Report
            </Button>
            <Button 
              onClick={onNextSection}
              variant="outline"
              className="border-gray-600 text-light-gray hover:border-white hover:text-white"
              data-testid="modal-button-next-section"
            >
              Next Phase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
