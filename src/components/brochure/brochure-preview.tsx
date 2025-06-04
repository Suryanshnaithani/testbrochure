import React, { useRef, forwardRef } from 'react'; // Import useRef and forwardRef
import { Download } from 'lucide-react'
import { Button } from '../ui/button';
import BrochureTemplateRenderer from './brochure-template-renderer';

interface BrochurePreviewProps {
  content: any;
  viewMode: string;
}

const BrochurePreview = forwardRef<HTMLDivElement, BrochurePreviewProps>(({ content, viewMode }, ref) => {

  return (
    <div ref={ref}> {/* Attach the ref to the outermost div */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Brochure Preview</h2>
          <div>
            <Button size="sm" onClick={() => {
                // Trigger PDF download here
              }}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
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
    </div>
  );
});

BrochurePreview.displayName = 'BrochurePreview'; // Optional: helps with debugging

export default BrochurePreview;