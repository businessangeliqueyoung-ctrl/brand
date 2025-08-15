import jsPDF from 'jspdf';
import type { Section, Prompt } from '@shared/schema';
import logoPath from '@assets/Simple Aesthetic Elegant Minimalist Logo_1755208304904.png';

export async function generatePDF(section: Section, responses: Record<string, any>, prompts: Prompt[] = []): Promise<void> {
  const doc = new jsPDF();
  
  // PDF styling
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Inspiring quotes for each section
  const sectionQuotes = {
    'personal-power': "Your mindset is your greatest asset. Everything else is just tactics.",
    'big-idea': "Ideas are common. Execution is rare. Transformation is legendary.",
    'market-trends': "The future belongs to those who see it coming.",
    'competitor-secrets': "Your competition teaches you how to win their customers.",
    'audience': "Speak to everyone, and you speak to no one. Precision creates profit.",
    'new-brand': "Your brand is what people say about you when you're not in the room.",
    'execute': "Strategy without execution is hallucination. Execution without strategy is chaos."
  };
  
  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12): number => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4) + 5;
  };

  // Add logo (create a simple design since we can't load the actual image in this context)
  doc.setFillColor(255, 0, 149); // Neon pink
  doc.circle(margin + 10, yPosition + 10, 8, 'F');
  doc.setFillColor(0, 180, 216); // Neon cyan  
  doc.circle(margin + 25, yPosition + 10, 8, 'F');
  
  // Header
  doc.setFontSize(28);
  doc.setTextColor(40, 40, 40);
  doc.text('Digital Branding Blueprint', margin + 40, yPosition + 15);
  yPosition += 25;
  
  doc.setFontSize(20);
  doc.setTextColor(255, 0, 149);
  doc.text(`${section.title}`, margin, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Phase ${section.phase} of 7 • Executive Strategy Report`, margin, yPosition);
  yPosition += 20;
  
  // Inspiring Quote
  const quote = sectionQuotes[section.slug as keyof typeof sectionQuotes] || "Excellence is not an act, but a habit.";
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(`"${quote}"`, margin + 10, yPosition + 15);
  yPosition += 35;

  // Section line
  doc.setDrawColor(255, 0, 149);
  doc.setLineWidth(2);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 20;
  
  // Executive Summary
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('Executive Summary', margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  yPosition = addWrappedText(section.description, margin, yPosition, pageWidth - 2 * margin, 12);
  yPosition += 15;
  
  // Insights Section
  if (section.insights && section.insights.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Key Insights', margin, yPosition);
    yPosition += 12;
    
    section.insights.forEach((insight, index) => {
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      yPosition = addWrappedText(`• "${insight}"`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 12);
      yPosition += 8;
    });
    
    yPosition += 10;
  }
  
  // Strategic Assessment Results
  if (Object.keys(responses).length > 0 && prompts.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Strategic Assessment Results', margin, yPosition);
    yPosition += 15;
    
    prompts.forEach((prompt, index) => {
      const response = responses[prompt.id];
      if (!response) return;
      
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Question number and title
      doc.setFillColor(255, 0, 149);
      doc.circle(margin + 5, yPosition + 5, 3, 'F');
      
      doc.setFontSize(13);
      doc.setTextColor(40, 40, 40);
      doc.text(`${index + 1}. ${prompt.title}`, margin + 15, yPosition + 7);
      yPosition += 15;
      
      // Question description
      if (prompt.description) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        yPosition = addWrappedText(prompt.description, margin + 15, yPosition, pageWidth - 35, 10);
        yPosition += 5;
      }
      
      // Response
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      yPosition = addWrappedText(`Answer: ${String(response)}`, margin + 15, yPosition, pageWidth - 35, 11);
      yPosition += 15;
    });
  }

  // Executive Action Items
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('Next Steps & Action Items', margin, yPosition);
  yPosition += 15;
  
  const actionItems = [
    "Review and refine your responses based on new insights gained",
    "Implement the strategic recommendations outlined in this assessment", 
    "Schedule follow-up sessions to track progress and adjust strategy",
    "Share key findings with your core team for alignment and execution",
    "Set measurable milestones for the next 30, 60, and 90 days"
  ];
  
  actionItems.forEach((item, index) => {
    doc.setFillColor(0, 180, 216);
    doc.rect(margin, yPosition, 3, 8, 'F');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPosition = addWrappedText(`${index + 1}. ${item}`, margin + 10, yPosition + 5, pageWidth - 35, 11);
    yPosition += 5;
  });
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by Digital Branding Blueprint', margin, footerY);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, footerY);
  
  // Save the PDF
  const fileName = `${section.slug}-blueprint-report.pdf`;
  doc.save(fileName);
}
