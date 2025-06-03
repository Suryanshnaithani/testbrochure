
"use client";

import { BrochureEditor } from '@/components/brochure/brochure-editor';
import { BrochurePreview } from '@/components/brochure/brochure-preview';
import { useBrochureContent } from '@/hooks/use-brochure-content';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import { RefreshCw, LayoutDashboard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React from 'react';

export default function BrochureBuilderPage() {
  const { 
    content, 
    updateContent, 
    updateAmenityItem, 
    addAmenity,
    removeAmenity,
    updateListItem,
    updatePage4SpecsFeaturesItem, // Updated for single floor plan specs list
    isLoaded, 
    setContent 
  } = useBrochureContent();
  const { toast } = useToast();

  const handleDownloadPdf = () => {
    toast({
      title: "Preparing PDF",
      description: "Your brochure PDF will be generated using the browser's print functionality.",
    });
    setTimeout(() => {
      window.print();
    }, 500); 
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-3 font-headline text-xl text-primary">Loading Brochure Forge...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="shadow-md no-print">
        <SidebarHeader className="h-[60px] flex items-center justify-between border-b px-3">
           <div className="flex items-center gap-2">
             <LayoutDashboard className="h-6 w-6 text-primary" />
             <h1 className="text-lg font-headline font-semibold text-primary">Brochure Editor</h1>
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
            onUpdatePage4SpecsFeaturesItem={updatePage4SpecsFeaturesItem} // Updated prop
            onSetContent={setContent}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
         <header className="h-[60px] flex items-center justify-between px-6 border-b bg-card shadow-sm no-print">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hidden md:flex text-primary hover:text-accent" /> 
              <h1 className="text-xl font-headline font-semibold text-primary">Brochure Forge</h1>
            </div>
          </header>
        <BrochurePreview 
          content={content} 
          onDownloadPdf={handleDownloadPdf}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
