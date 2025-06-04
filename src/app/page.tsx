
"use client";

import { BrochureEditor } from '@/components/brochure/brochure-editor';
import { BrochurePreview } from '@/components/brochure/brochure-preview';
import { useBrochureContent } from '@/hooks/use-brochure-content';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import { RefreshCw, LayoutDashboard, Settings, Eye } from 'lucide-react'; // Added Settings, Eye
import { useToast } from "@/hooks/use-toast";
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
        <p className="ml-3 font-headline text-xl text-primary">Loading Brochure Builder...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="shadow-md no-print">
        <SidebarHeader className="h-[60px] flex items-center justify-between border-b px-3">
           <div className="flex items-center gap-2">
             <Settings className="h-6 w-6 text-primary" /> {/* Changed icon */}
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
         <header className="h-[60px] flex items-center justify-between px-6 border-b bg-card shadow-sm no-print">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hidden md:flex text-primary hover:text-accent" />
              {/* Main App Title can go here, or be inferred by user */}
              <h1 className="text-xl font-headline font-semibold text-primary">Brochure Builder</h1>
            </div>
            {/* Actions related to the preview pane can stay here */}
            <Button onClick={handleDownloadPdf} size="sm" variant="outline">
              <Eye className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </header>
        <BrochurePreview
          content={content}
          onDownloadPdf={handleDownloadPdf} // Pass directly to preview if needed there, or keep control here
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

    