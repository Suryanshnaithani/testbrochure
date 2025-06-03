
"use client";

import type { BrochureContent } from '@/types/brochure';
import { BrochureTemplateRenderer } from './brochure-template-renderer';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

interface BrochurePreviewProps {
  content: BrochureContent;
  onDownloadPdf: () => void;
  onResetContent: () => void;
}

export const BrochurePreview: React.FC<BrochurePreviewProps> = ({ content, onDownloadPdf, onResetContent }) => {
  const [viewMode, setViewMode] = useState<'portrait' | 'landscape'>('portrait');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-card flex items-center justify-between no-print">
        <h2 className="text-xl font-headline">Brochure Preview</h2>
        <div className="flex items-center gap-4">
           <div className="flex items-center space-x-2">
            <Switch
              id="view-mode-toggle"
              checked={viewMode === 'landscape'}
              onCheckedChange={(checked) => setViewMode(checked ? 'landscape' : 'portrait')}
              aria-label={`Switch to ${viewMode === 'portrait' ? 'landscape' : 'portrait'} view`}
            />
            <Label htmlFor="view-mode-toggle" className="text-sm">
              {viewMode === 'portrait' ? 'Portrait View' : 'Landscape View'}
            </Label>
          </div>
          <Button onClick={onResetContent} variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset All Content
          </Button>
          <Button onClick={onDownloadPdf} size="sm">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
      <div 
        id="brochure-preview-area" 
        className={`flex-grow overflow-auto p-4 md:p-8 bg-muted/40 flex ${
          viewMode === 'landscape' 
            ? 'flex-row items-start justify-start' 
            : 'flex-col items-center justify-center' 
        }`}
      >
        <div 
            className="shadow-2xl" // This div will be scaled
            style={{ 
                transform: viewMode === 'landscape' ? 'scale(0.70)' : 'scale(0.80)',
                transformOrigin: viewMode === 'landscape' ? 'top left' : 'top center', 
                transition: 'transform 0.3s ease-out',
                // Ensure the div takes space according to its content for flexbox in #brochure-preview-area
                // The child <BrochureTemplateRenderer> will handle its internal flex for landscape
            }}
        > 
          <BrochureTemplateRenderer content={content} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};
