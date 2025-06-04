
"use client";

import type { BrochureContent, AmenityItem, FloorPlanItem } from '@/types/brochure';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wand2, PlusCircle, Trash2, CopyPlus, Upload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { suggestBrochureText, type SuggestBrochureTextInput } from '@/ai/flows/suggest-brochure-text';
import { ImageDropzone } from '@/components/ui/image-dropzone';
import { cn } from '@/lib/utils';

interface BrochureEditorProps {
  content: BrochureContent;
  onContentChange: <K1 extends keyof BrochureContent, K2 extends keyof BrochureContent[K1]>(
    pageKey: K1,
    fieldKey: K2,
    value: BrochureContent[K1][K2] | null
  ) => void;
  onAmenityItemChange: (amenityId: string, field: keyof AmenityItem, value: string | null) => void;
  onAddAmenity: () => void;
  onRemoveAmenity: (amenityId: string) => void;
  onListItemChange: <K1 extends keyof Exclude<BrochureContent, 'page3' | 'page4'>, K2 extends keyof Exclude<BrochureContent, 'page3' | 'page4'>[K1]>(
    pageKey: K1,
    fieldKey: K2,
    index: number,
    value: string
  ) => void;
  // Floor Plan specific handlers
  onAddFloorPlan: () => void;
  onRemoveFloorPlan: (floorPlanId: string) => void;
  onUpdateFloorPlanItem: (floorPlanId: string, field: keyof Omit<FloorPlanItem, 'id' | 'specsFeaturesItems'>, value: string | null) => void;
  onUpdateFloorPlanListItem: (floorPlanId: string, itemIndex: number, value: string) => void;
  onSetContent: (newContent: BrochureContent) => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn("text-lg font-headline font-semibold mt-3 mb-2 text-primary border-b border-primary/20 pb-1.5", className)}>{children}</h3>
);

const FieldSet: React.FC<{ label: string; htmlFor?: string; children: React.ReactNode; description?: string; className?: string }> = ({ label, htmlFor, children, description, className }) => (
  <div className={cn("space-y-1 mb-2.5", className)}>
    <Label htmlFor={htmlFor} className="font-semibold text-sm text-foreground/80">{label}</Label>
    {children}
    {description && <p className="text-xs text-muted-foreground pt-0.5">{description}</p>}
  </div>
);

export const BrochureEditor: React.FC<BrochureEditorProps> = ({
  content,
  onContentChange,
  onAmenityItemChange,
  onAddAmenity,
  onRemoveAmenity,
  onListItemChange,
  onAddFloorPlan,
  onRemoveFloorPlan,
  onUpdateFloorPlanItem,
  onUpdateFloorPlanListItem,
  onSetContent,
}) => {
  const { toast } = useToast();
  const [isLoadingAi, setIsLoadingAi] = useState<Record<string, boolean>>({});
  const [jsonInput, setJsonInput] = useState('');

  const handleImageChange = useCallback((pageKey: keyof BrochureContent, fieldKey: keyof BrochureContent[keyof BrochureContent], dataUri: string | null) => {
    onContentChange(pageKey, fieldKey as any, dataUri);
  }, [onContentChange]);

  const handleAmenityImageChange = useCallback((amenityId: string, dataUri: string | null) => {
    onAmenityItemChange(amenityId, 'imageUrl', dataUri);
  }, [onAmenityItemChange]);

  const handleFloorPlanImageChange = useCallback((floorPlanId: string, dataUri: string | null) => {
    onUpdateFloorPlanItem(floorPlanId, 'floorPlanImage', dataUri);
  }, [onUpdateFloorPlanItem]);


  const handleAiSuggest = async (
    imageFieldPage: keyof BrochureContent,
    imageFieldKey: keyof BrochureContent[keyof BrochureContent],
    targetPageKey: 'page1',
    targetFieldKey: 'introPara1' | 'introPara2'
  ) => {
    const imageSource = content[imageFieldPage] as any;
    const imageDataUri = imageSource ? imageSource[imageFieldKey] as string : null;

    if (!imageDataUri || !imageDataUri.startsWith('data:image')) {
      toast({ title: "AI Suggestion Error", description: "Please upload an image first for AI suggestions.", variant: "destructive" });
      return;
    }

    const loadingKey = `${targetPageKey}-${targetFieldKey}`;
    setIsLoadingAi(prev => ({ ...prev, [loadingKey]: true }));

    try {
      const input: SuggestBrochureTextInput = { imageDataUri };
      const result = await suggestBrochureText(input);
      if (result.suggestedText) {
        onContentChange(targetPageKey, targetFieldKey, result.suggestedText);
        toast({ title: "AI Suggestion Applied", description: `Text for ${targetFieldKey} updated.` });
      } else {
        toast({ title: "AI Suggestion", description: "No suggestion available or an error occurred.", variant: "destructive" });
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({ title: "AI Suggestion Error", description: "Could not generate suggestion.", variant: "destructive" });
    } finally {
      setIsLoadingAi(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const renderListInput = (
    list: string[] | undefined,
    labelPrefix: string,
    onChangeHandler: (index: number, value: string) => void,
    idPrefix: string
  ) => (
    <div className="space-y-2"> 
      {Array.isArray(list) && list.map((item, index) => (
        <FieldSet key={`${idPrefix}-${index}`} label={`${labelPrefix} #${index + 1}`} htmlFor={`${idPrefix}-${index}`} className="mb-0">
          <Input
            id={`${idPrefix}-${index}`}
            value={item}
            onChange={(e) => onChangeHandler(index, e.target.value)}
          />
        </FieldSet>
      ))}
    </div>
  );

  const handlePopulateFromJson = async () => {
    let parsedData: BrochureContent;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch (error) {
      toast({ title: "Invalid JSON", description: "The provided JSON is not valid.", variant: "destructive" });
      return;
    }

    // Basic validation - can be expanded
    if (!parsedData || typeof parsedData.meta?.brochureTitle !== 'string' || !parsedData.page4?.floorPlans) {
         toast({ title: "Invalid Data Structure", description: "The JSON data does not match the expected brochure structure.", variant: "destructive" });
         return;
    }

    try {
      const response = await fetch('/api/brochure/populate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        onSetContent(parsedData); // Update client-side content
        toast({ title: "Brochure Populated", description: "Content updated from JSON." });
        setJsonInput(''); // Clear textarea
      } else {
        const errorData = await response.json();
        toast({ title: "API Error", description: errorData.error || "Failed to populate from server.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error populating from JSON:", error);
      toast({ title: "Network Error", description: "Could not connect to the server.", variant: "destructive" });
    }
  };


  return (
    <div className="p-3 space-y-3 h-full overflow-y-auto scroll-smooth">
      <h2 className="text-xl font-headline text-primary border-b pb-1.5 mb-2.5">Edit Brochure Content</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="json-populate">
          <AccordionTrigger className="font-headline text-base hover:no-underline">Populate from JSON</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2">
            <FieldSet label="Paste Brochure JSON Data" htmlFor="json-data-input">
              <Textarea
                id="json-data-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
                placeholder="Paste your BrochureContent JSON here..."
                className="font-mono text-xs"
              />
            </FieldSet>
            <Button onClick={handlePopulateFromJson} size="sm">
              <Upload className="mr-2 h-4 w-4" /> Populate Brochure
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="multiple" defaultValue={['page1', 'page3', 'page4']} className="w-full">

        <AccordionItem value="page1">
          <AccordionTrigger className="font-headline text-base hover:no-underline">Page 1: Cover & Introduction</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2.5">
            <ImageDropzone
              label="Builder Logo"
              currentImage={content.page1.builderLogoImage}
              onFileChange={(dataUri) => handleImageChange('page1', 'builderLogoImage', dataUri)}
              aspectRatio="logo"
              className="mb-2.5"
            />
            <FieldSet label="Logo Text Line 1 (Fallback)" htmlFor="p1-logoTextLine1" description="Displayed if no logo image."><Input id="p1-logoTextLine1" value={content.page1.logoTextLine1} onChange={e => onContentChange('page1', 'logoTextLine1', e.target.value)} /></FieldSet>
            <FieldSet label="Logo Text Line 2 (Fallback)" htmlFor="p1-logoTextLine2" description="Displayed if no logo image."><Input id="p1-logoTextLine2" value={content.page1.logoTextLine2} onChange={e => onContentChange('page1', 'logoTextLine2', e.target.value)} /></FieldSet>
            <FieldSet label="Tagline (e.g., Sanskrit phrase or Motto)" htmlFor="p1-tagline"><Input id="p1-tagline" value={content.page1.tagline} onChange={e => onContentChange('page1', 'tagline', e.target.value)} /></FieldSet>

            <SectionTitle>Main Section</SectionTitle>
            <FieldSet label="Main Title" htmlFor="p1-mainTitle"><Input id="p1-mainTitle" value={content.page1.mainTitle} onChange={e => onContentChange('page1', 'mainTitle', e.target.value)} /></FieldSet>
            <FieldSet label="Subtitle" htmlFor="p1-subTitle"><Input id="p1-subTitle" value={content.page1.subTitle} onChange={e => onContentChange('page1', 'subTitle', e.target.value)} /></FieldSet>
            <ImageDropzone
              label="Building Image"
              currentImage={content.page1.buildingImage}
              onFileChange={(dataUri) => handleImageChange('page1', 'buildingImage', dataUri)}
              aspectRatio="landscape"
              className="mb-2.5"
            />

            <SectionTitle>Introduction</SectionTitle>
            <FieldSet label="Intro Heading" htmlFor="p1-introHeading"><Input id="p1-introHeading" value={content.page1.introHeading} onChange={e => onContentChange('page1', 'introHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Intro Paragraph 1" htmlFor="p1-introPara1">
              <Textarea id="p1-introPara1" value={content.page1.introPara1} onChange={e => onContentChange('page1', 'introPara1', e.target.value)} rows={5} />
              <Button onClick={() => handleAiSuggest('page1', 'buildingImage', 'page1', 'introPara1')} variant="outline" size="sm" className="mt-1 text-xs" disabled={isLoadingAi['page1-introPara1'] || !content.page1.buildingImage}>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" /> {isLoadingAi['page1-introPara1'] ? 'Suggesting...' : 'Suggest Text'}
              </Button>
            </FieldSet>
            <FieldSet label="Intro Paragraph 2" htmlFor="p1-introPara2">
              <Textarea id="p1-introPara2" value={content.page1.introPara2} onChange={e => onContentChange('page1', 'introPara2', e.target.value)} rows={5} />
              <Button onClick={() => handleAiSuggest('page1', 'buildingImage', 'page1', 'introPara2')} variant="outline" size="sm" className="mt-1 text-xs" disabled={isLoadingAi['page1-introPara2'] || !content.page1.buildingImage}>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" /> {isLoadingAi['page1-introPara2'] ? 'Suggesting...' : 'Suggest Text'}
              </Button>
            </FieldSet>

            <SectionTitle>Developer Info</SectionTitle>
            <FieldSet label="Developer Heading" htmlFor="p1-developerHeading"><Input id="p1-developerHeading" value={content.page1.developerHeading} onChange={e => onContentChange('page1', 'developerHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Developer Paragraph" htmlFor="p1-developerPara"><Textarea id="p1-developerPara" value={content.page1.developerPara} onChange={e => onContentChange('page1', 'developerPara', e.target.value)} rows={4} /></FieldSet>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page2">
          <AccordionTrigger className="font-headline text-base hover:no-underline">Page 2: Location & Connectivity</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2.5">
            <FieldSet label="Site Address Heading" htmlFor="p2-siteAddressHeading"><Input id="p2-siteAddressHeading" value={content.page2.siteAddressHeading} onChange={e => onContentChange('page2', 'siteAddressHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Site Address" htmlFor="p2-siteAddress"><Textarea id="p2-siteAddress" value={content.page2.siteAddress} onChange={e => onContentChange('page2', 'siteAddress', e.target.value)} rows={3} /></FieldSet>
            <ImageDropzone
              label="Location Map Image"
              currentImage={content.page2.locationMapImage}
              onFileChange={(dataUri) => handleImageChange('page2', 'locationMapImage', dataUri)}
              aspectRatio="landscape"
              className="mb-2.5"
            />

            <SectionTitle>Connectivity Details</SectionTitle>
            <FieldSet label="Connectivity Heading" htmlFor="p2-connectivityHeading"><Input id="p2-connectivityHeading" value={content.page2.connectivityHeading} onChange={e => onContentChange('page2', 'connectivityHeading', e.target.value)} /></FieldSet>

            <FieldSet label="Metro & Railway Title" htmlFor="p2-connMetroTitle"><Input id="p2-connMetroTitle" value={content.page2.connectivityMetroRailwayTitle} onChange={e => onContentChange('page2', 'connectivityMetroRailwayTitle', e.target.value)} /></FieldSet>
            {renderListInput(content.page2.connectivityMetroRailwayItems, 'Metro/Railway Item', (index, value) => onListItemChange('page2', 'connectivityMetroRailwayItems' as any, index, value), 'p2-connMetroItem')}

            <FieldSet label="Major Roads Title" htmlFor="p2-connRoadsTitle"><Input id="p2-connRoadsTitle" value={content.page2.connectivityMajorRoadsTitle} onChange={e => onContentChange('page2', 'connectivityMajorRoadsTitle', e.target.value)} /></FieldSet>
            {renderListInput(content.page2.connectivityMajorRoadsItems, 'Major Road Item', (index, value) => onListItemChange('page2', 'connectivityMajorRoadsItems' as any, index, value), 'p2-connRoadsItem')}

            <FieldSet label="Healthcare Title" htmlFor="p2-connHealthTitle"><Input id="p2-connHealthTitle" value={content.page2.connectivityHealthcareTitle} onChange={e => onContentChange('page2', 'connectivityHealthcareTitle', e.target.value)} /></FieldSet>
            {renderListInput(content.page2.connectivityHealthcareItems, 'Healthcare Item', (index, value) => onListItemChange('page2', 'connectivityHealthcareItems' as any, index, value), 'p2-connHealthItem')}

            <FieldSet label="Education Title" htmlFor="p2-connEduTitle"><Input id="p2-connEduTitle" value={content.page2.connectivityEducationTitle} onChange={e => onContentChange('page2', 'connectivityEducationTitle', e.target.value)} /></FieldSet>
            {renderListInput(content.page2.connectivityEducationItems, 'Education Item', (index, value) => onListItemChange('page2', 'connectivityEducationItems' as any, index, value), 'p2-connEduItem')}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page3">
          <AccordionTrigger className="font-headline text-base hover:no-underline">Page 3: Amenities & Master Plan</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2.5">
            <FieldSet label="Amenities Heading" htmlFor="p3-amenitiesHeading"><Input id="p3-amenitiesHeading" value={content.page3.amenitiesHeading} onChange={e => onContentChange('page3', 'amenitiesHeading', e.target.value)} /></FieldSet>
            <SectionTitle className="mt-0">Amenities List</SectionTitle>
            {content.page3.amenities.map((amenity) => (
              <div key={amenity.id} className="p-2.5 border rounded-lg space-y-2 bg-card shadow-sm relative">
                <FieldSet label={`Icon (Emoji/Symbol)`} htmlFor={`p3-amenity-icon-${amenity.id}`} className="mb-1">
                  <Input
                    id={`p3-amenity-icon-${amenity.id}`}
                    value={amenity.icon}
                    onChange={e => onAmenityItemChange(amenity.id, 'icon', e.target.value)}
                    maxLength={2}
                    className="w-16 text-center"
                  />
                </FieldSet>
                <FieldSet label="Amenity Text" htmlFor={`p3-amenity-text-${amenity.id}`} className="mb-1">
                  <Input id={`p3-amenity-text-${amenity.id}`} value={amenity.text} onChange={e => onAmenityItemChange(amenity.id, 'text', e.target.value)} />
                </FieldSet>
                <ImageDropzone
                  label="Amenity Image (Optional)"
                  currentImage={amenity.imageUrl}
                  onFileChange={(dataUri) => handleAmenityImageChange(amenity.id, dataUri)}
                  aspectRatio="square"
                  className="mb-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveAmenity(amenity.id)}
                  className="absolute top-1 right-1 h-7 w-7 text-destructive hover:bg-destructive/10 p-1"
                  aria-label="Remove amenity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={onAddAmenity} variant="outline" size="sm" className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Amenity
            </Button>
            <SectionTitle>Master Plan</SectionTitle>
            <FieldSet label="Master Plan Heading" htmlFor="p3-masterPlanHeading"><Input id="p3-masterPlanHeading" value={content.page3.masterPlanHeading} onChange={e => onContentChange('page3', 'masterPlanHeading', e.target.value)} /></FieldSet>
            <ImageDropzone
              label="Master Plan Image"
              currentImage={content.page3.masterPlanImage}
              onFileChange={(dataUri) => handleImageChange('page3', 'masterPlanImage', dataUri)}
              aspectRatio="landscape"
              className="mb-2.5"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page4">
          <AccordionTrigger className="font-headline text-base hover:no-underline">Page 4+: Floor Plans & Contact</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2.5">
            <FieldSet label="Main Heading for All Floor Plans" htmlFor="p4-floorPlanHeadingGlobal">
                <Input id="p4-floorPlanHeadingGlobal" value={content.page4.floorPlanHeading} onChange={e => onContentChange('page4', 'floorPlanHeading', e.target.value)} />
            </FieldSet>

            {content.page4.floorPlans.map((floorPlan, fpIndex) => (
              <div key={floorPlan.id} className="p-2.5 border rounded-lg space-y-2.5 bg-card shadow-md relative mt-2.5">
                <SectionTitle className="mt-0 mb-2 text-base">Floor Plan #{fpIndex + 1}: {floorPlan.name || "Untitled"}</SectionTitle>
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFloorPlan(floorPlan.id)}
                  className="absolute top-1 right-1 h-8 w-8 text-destructive hover:bg-destructive/10 p-1.5"
                  aria-label="Remove floor plan"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <FieldSet label="Floor Plan Name" htmlFor={`fp-name-${floorPlan.id}`}>
                  <Input id={`fp-name-${floorPlan.id}`} value={floorPlan.name} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'name', e.target.value)} />
                </FieldSet>
                <ImageDropzone
                  label="Floor Plan Image"
                  currentImage={floorPlan.floorPlanImage}
                  onFileChange={(dataUri) => handleFloorPlanImageChange(floorPlan.id, dataUri)}
                  aspectRatio="landscape"
                  className="mb-2.5"
                />
                <FieldSet label="Specifications Heading" htmlFor={`fp-specsHeading-${floorPlan.id}`}>
                  <Input id={`fp-specsHeading-${floorPlan.id}`} value={floorPlan.specsHeading} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsHeading', e.target.value)} />
                </FieldSet>
                <FieldSet label="Carpet Area" htmlFor={`fp-specsCarpetArea-${floorPlan.id}`}>
                  <Input id={`fp-specsCarpetArea-${floorPlan.id}`} value={floorPlan.specsCarpetArea} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsCarpetArea', e.target.value)} />
                </FieldSet>
                <FieldSet label="Built-up Area" htmlFor={`fp-specsBuiltUpArea-${floorPlan.id}`}>
                  <Input id={`fp-specsBuiltUpArea-${floorPlan.id}`} value={floorPlan.specsBuiltUpArea} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsBuiltUpArea', e.target.value)} />
                </FieldSet>
                <FieldSet label="Balcony Area" htmlFor={`fp-specsBalconyArea-${floorPlan.id}`}>
                  <Input id={`fp-specsBalconyArea-${floorPlan.id}`} value={floorPlan.specsBalconyArea} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsBalconyArea', e.target.value)} />
                </FieldSet>
                <FieldSet label="Configuration" htmlFor={`fp-specsConfiguration-${floorPlan.id}`}>
                  <Input id={`fp-specsConfiguration-${floorPlan.id}`} value={floorPlan.specsConfiguration} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsConfiguration', e.target.value)} />
                </FieldSet>
                <FieldSet label="Features Title" htmlFor={`fp-specsFeaturesTitle-${floorPlan.id}`}>
                  <Input id={`fp-specsFeaturesTitle-${floorPlan.id}`} value={floorPlan.specsFeaturesTitle} onChange={e => onUpdateFloorPlanItem(floorPlan.id, 'specsFeaturesTitle', e.target.value)} />
                </FieldSet>
                {renderListInput(floorPlan.specsFeaturesItems, 'Feature Item', (index, value) => onUpdateFloorPlanListItem(floorPlan.id, index, value), `fp-${floorPlan.id}-specsFeatureItem`)}
              </div>
            ))}
            <Button onClick={onAddFloorPlan} variant="outline" size="sm" className="mt-2.5">
              <CopyPlus className="mr-2 h-4 w-4" /> Add Another Floor Plan
            </Button>

            <SectionTitle>Contact Information</SectionTitle>
            <FieldSet label="Contact Info Heading" htmlFor="p4-contactInfoHeading"><Input id="p4-contactInfoHeading" value={content.page4.contactInfoHeading} onChange={e => onContentChange('page4', 'contactInfoHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Title" htmlFor="p4-salesOfficeTitle"><Input id="p4-salesOfficeTitle" value={content.page4.contactSalesOfficeTitle} onChange={e => onContentChange('page4', 'contactSalesOfficeTitle', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Phone" htmlFor="p4-salesOfficePhone"><Input id="p4-salesOfficePhone" value={content.page4.contactSalesOfficePhone} onChange={e => onContentChange('page4', 'contactSalesOfficePhone', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Email" htmlFor="p4-salesOfficeEmail"><Input type="email" id="p4-salesOfficeEmail" value={content.page4.contactSalesOfficeEmail} onChange={e => onContentChange('page4', 'contactSalesOfficeEmail', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Website" htmlFor="p4-salesOfficeWebsite"><Input type="url" id="p4-salesOfficeWebsite" value={content.page4.contactSalesOfficeWebsite} onChange={e => onContentChange('page4', 'contactSalesOfficeWebsite', e.target.value)} /></FieldSet>
            <FieldSet label="Site Office Title" htmlFor="p4-siteOfficeTitle"><Input id="p4-siteOfficeTitle" value={content.page4.contactSiteOfficeTitle} onChange={e => onContentChange('page4', 'contactSiteOfficeTitle', e.target.value)} /></FieldSet>
            <FieldSet label="Site Office Address" htmlFor="p4-siteOfficeAddress"><Textarea id="p4-siteOfficeAddress" value={content.page4.contactSiteOfficeAddress} onChange={e => onContentChange('page4', 'contactSiteOfficeAddress', e.target.value)} rows={3} /></FieldSet>
            <FieldSet label="Site Office Hours" htmlFor="p4-siteOfficeHours"><Input id="p4-siteOfficeHours" value={content.page4.contactSiteOfficeHours} onChange={e => onContentChange('page4', 'contactSiteOfficeHours', e.target.value)} /></FieldSet>

            <SectionTitle>Legal Information</SectionTitle>
            <FieldSet label="Legal Info Heading" htmlFor="p4-legalInfoHeading"><Input id="p4-legalInfoHeading" value={content.page4.legalInfoHeading} onChange={e => onContentChange('page4', 'legalInfoHeading', e.target.value)} /></FieldSet>
            <FieldSet label="RERA No." htmlFor="p4-legalReraNo"><Input id="p4-legalReraNo" value={content.page4.legalReraNo} onChange={e => onContentChange('page4', 'legalReraNo', e.target.value)} /></FieldSet>
            <FieldSet label="RERA Link Text" htmlFor="p4-legalReraLinkText"><Input id="p4-legalReraLinkText" value={content.page4.legalReraLinkText} onChange={e => onContentChange('page4', 'legalReraLinkText', e.target.value)} /></FieldSet>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
