
"use client";

import { BrochureEditor } from '@/components/brochure/brochure-editor';
import { BrochurePreview } from '@/components/brochure/brochure-preview';
import { useBrochureContent } from '@/hooks/use-brochure-content';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import { RefreshCw, Settings, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function BrochureBuilderPage() {
  const {
    content,
    updateContent,
    updateAmenityItem,
    addAmenity,
    removeAmenity,
    updateListItem,
    addFloorPlan,
    removeFloorPlan,
    updateFloorPlanItem,
    updateFloorPlanListItem,
    isLoaded,
    setContent
  } = useBrochureContent();
  const { toast } = useToast();
  const brochurePreviewRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!brochurePreviewRef.current) {
      toast({
        title: "Error",
        description: "Could not find brochure preview element.",
        variant: "destructive"
      });
      return;
    }

    const brochureContainer = brochurePreviewRef.current.querySelector('#brochure-container');
    if (!brochureContainer) {
      toast({
        title: "Error",
        description: "Brochure content container not found for PDF generation.",
        variant: "destructive"
      });
      return;
    }
    const rawHtmlContent = brochureContainer.innerHTML;

    // CSS specific for xhtml2pdf processing
    // We rely on inline styles from React for most page layout (.page dimensions, etc.)
    // This CSS primarily ensures page breaks and hides elements explicitly for PDF.
    const xhtml2pdfStyles = `
      @page {
        size: A4 portrait;
        margin: 0mm; /* Ensure no default browser margins interfere */
      }
      body {
        margin: 0; /* Basic reset */
        font-family: 'PT Sans', Arial, sans-serif; /* Default font from brochure */
        -webkit-print-color-adjust: exact !important; /* For Webkit-based renderers if any confusion */
        color-adjust: exact !important; /* Standard property */
      }
      /* These .page styles are mostly for structure; specifics come from inline styles */
      .page {
        page-break-after: always;
        overflow: hidden !important; /* Crucial for xhtml2pdf with fixed page sizes */
        /* width and height should come from inline styles on each .page div (e.g., 210mm, 297mm) */
        /* Ensure background colors and images are printed - xhtml2pdf usually handles this if specified */
      }
      .page:last-of-type {
        page-break-after: avoid;
      }
      /* Hide elements that should absolutely not be in the PDF */
      .no-print,
      div[data-radix-toast-provider], /* Radix Toasts container, just in case it's picked up */
      /* Be very specific about other UI elements if they appear in rawHTML */
      button.no-print, input.no-print /* Example if editor elements were somehow included */
      {
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      img { /* Ensure images scale correctly */
          max-width: 100%;
          height: auto;
      }
      /* Ensure any text color intended for print is not overridden by default black */
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    `;

    const fullHtmlForPdf = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Brochure</title>
        <style type="text/css">
          ${xhtml2pdfStyles}
        </style>
      </head>
      <body>
        ${rawHtmlContent}
      </body>
      </html>
    `;

    toast({
      title: "Preparing PDF",
      description: "Generating PDF. This may take a moment.",
    });

    try {
      const response = await fetch('/api/generate-brochure-pdf', { // Corrected endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html_content: fullHtmlForPdf }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PDF generation failed on server:", errorText);
        throw new Error(`PDF generation failed. Status: ${response.status}. ${errorText}`);
      }

      const blob = await response.blob();
      if (blob.type !== 'application/pdf') {
        console.error("Received blob is not a PDF:", blob);
        throw new Error("The server did not return a PDF file. Check server logs.");
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'brochure.pdf';
      document.body.appendChild(a); // Required for Firefox
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a); // Clean up
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error Generating PDF",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again or check console.",
        variant: "destructive"
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-3 font-headline text-xl text-primary">Loading Brochure Builder...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="shadow-md no-print">
        <SidebarHeader className="h-[60px] flex items-center justify-between border-b px-4">
           <div className="flex items-center gap-2">
             <Settings className="h-6 w-6 text-primary" />
             <h1 className="text-lg font-headline font-semibold text-primary">Editor Settings</h1>
           </div>
           <SidebarTrigger className="md:hidden text-primary hover:text-accent" />
        </SidebarHeader>
        <SidebarContent>
          <BrochureEditor
            content={content}
            onContentChange={updateContent}
            onAmenityItemChange={updateAmenityItem}
            onAddAmenity={addAmenity}
            onRemoveAmenity={removeAmenity}
            onListItemChange={updateListItem}
            onAddFloorPlan={addFloorPlan}
            onRemoveFloorPlan={removeFloorPlan}
            onUpdateFloorPlanItem={updateFloorPlanItem}
            onUpdateFloorPlanListItem={updateFloorPlanListItem}
            onSetContent={setContent}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
         <header className="h-[60px] flex items-center justify-between px-4 border-b bg-card shadow-sm no-print">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hidden md:flex text-primary hover:text-accent" />
              <h1 className="text-xl font-headline font-semibold text-primary">Brochure Builder</h1>
            </div>
            <Button onClick={handleDownloadPdf} size="sm" variant="outline">
              <Eye className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </header>
        <BrochurePreview
          ref={brochurePreviewRef}
          content={content}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
