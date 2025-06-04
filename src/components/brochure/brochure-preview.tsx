
"use client";

import type { BrochureContent } from '@/types/brochure';
import { BrochureTemplateRenderer } from './brochure-template-renderer';
// Button and Download icon are no longer needed here
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

interface BrochurePreviewProps {
  content: BrochureContent;
  // onDownloadPdf prop removed
}

export const BrochurePreview: React.FC<BrochurePreviewProps> = ({ content }) => {
  const [viewMode, setViewMode] = useState<'portrait' | 'landscape'>('portrait');

  return (
    <div className="flex flex-col h-full bg-muted/20">
      <div className="h-[60px] px-4 border-b bg-card flex items-center justify-between no-print shadow-sm">
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
          {/* Download PDF Button Removed from here */}
        </div>
      </div>
      <div
        id="brochure-preview-area"
        className={`flex-grow overflow-auto p-6 md:p-10 ${
          viewMode === 'landscape'
            ? 'flex-row items-start justify-start'
            : 'flex-col items-center justify-start' 
        }`}
      >
        <div
            id="scaled-brochure-wrapper" // Added ID for print styling
            style={{
                display: 'inline-block', 
                transform: viewMode === 'landscape' ? 'scale(0.65)' : 'scale(0.8)',
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
