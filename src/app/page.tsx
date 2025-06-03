
"use client";

import { BrochureEditor } from '@/components/brochure/brochure-editor';
import { BrochurePreview } from '@/components/brochure/brochure-preview';
import { useBrochureContent } from '@/hooks/use-brochure-content';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React from 'react';

export default function BrochureBuilderPage() {
  const { content, updateContent, updateAmenityText, updateListItem, resetContent, isLoaded, setContent } = useBrochureContent();
  const { toast } = useToast();

  const handleDownloadPdf = () => {
    toast({
      title: "Preparing PDF",
      description: "Your brochure PDF will be generated using the browser's print functionality.",
    });
    // Timeout to allow toast to show before print dialog potentially blocks UI updates
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content? This cannot be undone.")) {
      resetContent();
      toast({
        title: "Content Reset",
        description: "The brochure content has been reset to defaults.",
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 font-headline text-lg">Loading Brochure Builder...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="h-[60px] flex items-center justify-between border-b">
           <h1 className="text-lg font-headline font-semibold text-primary px-2">Brochure Editor</h1>
           <SidebarTrigger className="md:hidden" /> {/* Mobile toggle */}
        </SidebarHeader>
        <SidebarContent>
          <BrochureEditor 
            content={content} 
            onContentChange={updateContent} 
            onAmenityTextChange={updateAmenityText}
            onListItemChange={updateListItem}
            onSetContent={setContent}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen overflow-hidden"> {/* Ensure SidebarInset itself doesn't scroll */}
         <header className="h-[60px] flex items-center justify-between px-6 border-b bg-card no-print">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" /> {/* Desktop toggle */}
              <h1 className="text-xl font-headline font-semibold text-primary">Insignia Brochure Builder</h1>
            </div>
          </header>
        <BrochurePreview 
          content={content} 
          onDownloadPdf={handleDownloadPdf}
          onResetContent={handleReset}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
