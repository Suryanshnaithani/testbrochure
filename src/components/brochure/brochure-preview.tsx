
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
    <div className="flex flex-col h-full bg-muted/20">
      <div className="p-4 border-b bg-card flex items-center justify-between no-print shadow-sm">
        <h2 className="text-xl font-headline text-primary">Brochure Preview</h2>
        <div className="flex items-center gap-4">
           <div className="flex items-center space-x-2">
            <Switch
              id="view-mode-toggle"
              checked={viewMode === 'landscape'}
              onCheckedChange={(checked) => setViewMode(checked ? 'landscape' : 'portrait')}
              aria-label={`Switch to ${viewMode === 'portrait' ? 'landscape' : 'portrait'} view`}
            />
            <Label htmlFor="view-mode-toggle" className="text-sm font-medium">
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
        className={`flex-grow overflow-auto p-6 md:p-10 ${ // Increased padding
          viewMode === 'landscape'
            ? 'flex-row items-start justify-start' // justify-start for horizontal scroll to begin from left
            : 'flex-col items-center justify-start' 
        }`}
      >
        <div
            // Removed shadow-2xl from here as spreads will have their own
            style={{
                display: 'inline-block', 
                transform: viewMode === 'landscape' ? 'scale(0.65)' : 'scale(0.8)', // Adjusted scale
                transformOrigin: viewMode === 'landscape' ? 'top left' : 'top center',
                transition: 'transform 0.3s ease-out',
            }}
        >
          <BrochureTemplateRenderer content={content} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};

