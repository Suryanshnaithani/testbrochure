
"use client";

import type { BrochureContent, AmenityItem } from '@/types/brochure';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wand2, PlusCircle, Trash2 } from 'lucide-react';
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
  onUpdatePage4SpecsFeaturesItem: (index: number, value: string) => void; // Specific for page4 specs list
  onSetContent: (newContent: BrochureContent) => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn("text-lg font-headline font-semibold mt-6 mb-3 text-primary", className)}>{children}</h3>
);

const FieldSet: React.FC<{ label: string; htmlFor?: string; children: React.ReactNode; description?: string; className?: string }> = ({ label, htmlFor, children, description, className }) => (
  <div className={cn("space-y-1.5 mb-4", className)}>
    <Label htmlFor={htmlFor} className="font-semibold text-sm">{label}</Label>
    {children}
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
  </div>
);

export const BrochureEditor: React.FC<BrochureEditorProps> = ({
  content,
  onContentChange,
  onAmenityItemChange,
  onAddAmenity,
  onRemoveAmenity,
  onListItemChange,
  onUpdatePage4SpecsFeaturesItem,
  // onSetContent prop is available but might not be used directly here
}) => {
  const { toast } = useToast();
  const [isLoadingAi, setIsLoadingAi] = useState<Record<string, boolean>>({});

  const handleImageChange = useCallback((pageKey: keyof BrochureContent, fieldKey: keyof BrochureContent[keyof BrochureContent], dataUri: string | null) => {
    onContentChange(pageKey, fieldKey as any, dataUri);
  }, [onContentChange]);

  const handleAmenityImageChange = useCallback((amenityId: string, dataUri: string | null) => {
    onAmenityItemChange(amenityId, 'imageUrl', dataUri);
  }, [onAmenityItemChange]);

  const handleFloorPlanImageChange = useCallback((dataUri: string | null) => {
    onContentChange('page4', 'floorPlanImage', dataUri);
  }, [onContentChange]);


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

  const renderListEditor = (
    list: string[] | undefined,
    labelPrefix: string,
    onChangeHandler: (index: number, value: string) => void,
    idPrefix: string
  ) => (
    <div>
      {Array.isArray(list) && list.map((item, index) => (
        <FieldSet key={index} label={`${labelPrefix} #${index + 1}`} htmlFor={`${idPrefix}-${index}`}>
          <Input
            id={`${idPrefix}-${index}`}
            value={item}
            onChange={(e) => onChangeHandler(index, e.target.value)}
          />
        </FieldSet>
      ))}
    </div>
  );


  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <h2 className="text-xl font-headline text-primary border-b pb-2">Edit Brochure Content</h2>
      <Accordion type="multiple" defaultValue={['page1', 'page3', 'page4']} className="w-full">

        <AccordionItem value="page1">
          <AccordionTrigger className="font-headline text-base">Page 1: Cover & Introduction</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            <ImageDropzone
              label="Builder Logo"
              currentImage={content.page1.builderLogoImage}
              onFileChange={(dataUri) => handleImageChange('page1', 'builderLogoImage', dataUri)}
              aspectRatio="logo"
              className="mb-4"
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
              className="mb-4"
            />

            <SectionTitle>Introduction</SectionTitle>
            <FieldSet label="Intro Heading" htmlFor="p1-introHeading"><Input id="p1-introHeading" value={content.page1.introHeading} onChange={e => onContentChange('page1', 'introHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Intro Paragraph 1" htmlFor="p1-introPara1">
              <Textarea id="p1-introPara1" value={content.page1.introPara1} onChange={e => onContentChange('page1', 'introPara1', e.target.value)} rows={4} />
              <Button onClick={() => handleAiSuggest('page1', 'buildingImage', 'page1', 'introPara1')} variant="outline" size="sm" className="mt-1.5 text-xs" disabled={isLoadingAi['page1-introPara1'] || !content.page1.buildingImage}>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" /> {isLoadingAi['page1-introPara1'] ? 'Suggesting...' : 'Suggest Text'}
              </Button>
            </FieldSet>
            <FieldSet label="Intro Paragraph 2" htmlFor="p1-introPara2">
              <Textarea id="p1-introPara2" value={content.page1.introPara2} onChange={e => onContentChange('page1', 'introPara2', e.target.value)} rows={4} />
              <Button onClick={() => handleAiSuggest('page1', 'buildingImage', 'page1', 'introPara2')} variant="outline" size="sm" className="mt-1.5 text-xs" disabled={isLoadingAi['page1-introPara2'] || !content.page1.buildingImage}>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" /> {isLoadingAi['page1-introPara2'] ? 'Suggesting...' : 'Suggest Text'}
              </Button>
            </FieldSet>

            <SectionTitle>Developer Info</SectionTitle>
            <FieldSet label="Developer Heading" htmlFor="p1-developerHeading"><Input id="p1-developerHeading" value={content.page1.developerHeading} onChange={e => onContentChange('page1', 'developerHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Developer Paragraph" htmlFor="p1-developerPara"><Textarea id="p1-developerPara" value={content.page1.developerPara} onChange={e => onContentChange('page1', 'developerPara', e.target.value)} rows={3} /></FieldSet>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page2">
          <AccordionTrigger className="font-headline text-base">Page 2: Location & Connectivity</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            <FieldSet label="Site Address Heading" htmlFor="p2-siteAddressHeading"><Input id="p2-siteAddressHeading" value={content.page2.siteAddressHeading} onChange={e => onContentChange('page2', 'siteAddressHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Site Address" htmlFor="p2-siteAddress"><Textarea id="p2-siteAddress" value={content.page2.siteAddress} onChange={e => onContentChange('page2', 'siteAddress', e.target.value)} rows={4} /></FieldSet>
            <ImageDropzone
              label="Location Map Image"
              currentImage={content.page2.locationMapImage}
              onFileChange={(dataUri) => handleImageChange('page2', 'locationMapImage', dataUri)}
              aspectRatio="landscape"
              className="mb-4"
            />

            <SectionTitle>Connectivity Details</SectionTitle>
            <FieldSet label="Connectivity Heading" htmlFor="p2-connectivityHeading"><Input id="p2-connectivityHeading" value={content.page2.connectivityHeading} onChange={e => onContentChange('page2', 'connectivityHeading', e.target.value)} /></FieldSet>
            
            <FieldSet label="Metro & Railway Title" htmlFor="p2-connMetroTitle"><Input id="p2-connMetroTitle" value={content.page2.connectivityMetroRailwayTitle} onChange={e => onContentChange('page2', 'connectivityMetroRailwayTitle', e.target.value)} /></FieldSet>
            {renderListEditor(content.page2.connectivityMetroRailwayItems, 'Metro/Railway Item', (index, value) => onListItemChange('page2', 'connectivityMetroRailwayItems' as any, index, value), 'p2-connMetroItem')}

            <FieldSet label="Major Roads Title" htmlFor="p2-connRoadsTitle"><Input id="p2-connRoadsTitle" value={content.page2.connectivityMajorRoadsTitle} onChange={e => onContentChange('page2', 'connectivityMajorRoadsTitle', e.target.value)} /></FieldSet>
            {renderListEditor(content.page2.connectivityMajorRoadsItems, 'Major Road Item', (index, value) => onListItemChange('page2', 'connectivityMajorRoadsItems' as any, index, value), 'p2-connRoadsItem')}

            <FieldSet label="Healthcare Title" htmlFor="p2-connHealthTitle"><Input id="p2-connHealthTitle" value={content.page2.connectivityHealthcareTitle} onChange={e => onContentChange('page2', 'connectivityHealthcareTitle', e.target.value)} /></FieldSet>
            {renderListEditor(content.page2.connectivityHealthcareItems, 'Healthcare Item', (index, value) => onListItemChange('page2', 'connectivityHealthcareItems' as any, index, value), 'p2-connHealthItem')}

            <FieldSet label="Education Title" htmlFor="p2-connEduTitle"><Input id="p2-connEduTitle" value={content.page2.connectivityEducationTitle} onChange={e => onContentChange('page2', 'connectivityEducationTitle', e.target.value)} /></FieldSet>
            {renderListEditor(content.page2.connectivityEducationItems, 'Education Item', (index, value) => onListItemChange('page2', 'connectivityEducationItems' as any, index, value), 'p2-connEduItem')}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page3">
          <AccordionTrigger className="font-headline text-base">Page 3: Amenities & Master Plan</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            <FieldSet label="Amenities Heading" htmlFor="p3-amenitiesHeading"><Input id="p3-amenitiesHeading" value={content.page3.amenitiesHeading} onChange={e => onContentChange('page3', 'amenitiesHeading', e.target.value)} /></FieldSet>
            <SectionTitle>Amenities List</SectionTitle>
            {content.page3.amenities.map((amenity) => (
              <div key={amenity.id} className="p-3 border rounded-md space-y-3 bg-muted/20 relative">
                <FieldSet label={`Icon (Emoji/Symbol)`} htmlFor={`p3-amenity-icon-${amenity.id}`} className="mb-2">
                  <Input
                    id={`p3-amenity-icon-${amenity.id}`}
                    value={amenity.icon}
                    onChange={e => onAmenityItemChange(amenity.id, 'icon', e.target.value)}
                    maxLength={2}
                    className="w-16 text-center"
                  />
                </FieldSet>
                <FieldSet label="Amenity Text" htmlFor={`p3-amenity-text-${amenity.id}`} className="mb-2">
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
                  className="absolute top-1 right-1 h-7 w-7 text-destructive hover:bg-destructive/10"
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
              className="mb-4"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="page4">
          <AccordionTrigger className="font-headline text-base">Page 4: Floor Plan & Contact</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            <SectionTitle>Floor Plan Details</SectionTitle>
            <FieldSet label="Floor Plan Main Heading" htmlFor="p4-floorPlanHeading">
              <Input id="p4-floorPlanHeading" value={content.page4.floorPlanHeading} onChange={e => onContentChange('page4', 'floorPlanHeading', e.target.value)} />
            </FieldSet>
            <FieldSet label="Floor Plan Name" htmlFor="p4-floorPlanName">
              <Input id="p4-floorPlanName" value={content.page4.floorPlanName} onChange={e => onContentChange('page4', 'floorPlanName', e.target.value)} />
            </FieldSet>
            <ImageDropzone
              label="Floor Plan Image"
              currentImage={content.page4.floorPlanImage}
              onFileChange={(dataUri) => handleFloorPlanImageChange(dataUri)}
              aspectRatio="square"
              className="mb-4"
            />
            <FieldSet label="Specifications Heading" htmlFor="p4-specsHeading">
              <Input id="p4-specsHeading" value={content.page4.specsHeading} onChange={e => onContentChange('page4', 'specsHeading', e.target.value)} />
            </FieldSet>
            <FieldSet label="Carpet Area" htmlFor="p4-specsCarpetArea">
              <Input id="p4-specsCarpetArea" value={content.page4.specsCarpetArea} onChange={e => onContentChange('page4', 'specsCarpetArea', e.target.value)} />
            </FieldSet>
            <FieldSet label="Built-up Area" htmlFor="p4-specsBuiltUpArea">
              <Input id="p4-specsBuiltUpArea" value={content.page4.specsBuiltUpArea} onChange={e => onContentChange('page4', 'specsBuiltUpArea', e.target.value)} />
            </FieldSet>
            <FieldSet label="Balcony Area" htmlFor="p4-specsBalconyArea">
              <Input id="p4-specsBalconyArea" value={content.page4.specsBalconyArea} onChange={e => onContentChange('page4', 'specsBalconyArea', e.target.value)} />
            </FieldSet>
            <FieldSet label="Configuration" htmlFor="p4-specsConfiguration">
              <Input id="p4-specsConfiguration" value={content.page4.specsConfiguration} onChange={e => onContentChange('page4', 'specsConfiguration', e.target.value)} />
            </FieldSet>
            <FieldSet label="Features Title" htmlFor="p4-specsFeaturesTitle">
              <Input id="p4-specsFeaturesTitle" value={content.page4.specsFeaturesTitle} onChange={e => onContentChange('page4', 'specsFeaturesTitle', e.target.value)} />
            </FieldSet>
            {renderListEditor(content.page4.specsFeaturesItems, 'Feature Item', (index, value) => onUpdatePage4SpecsFeaturesItem(index, value), 'p4-specsFeatureItem')}
            
            {/* Contact Information Section */}
            <SectionTitle>Contact Information</SectionTitle>
            <FieldSet label="Contact Info Heading" htmlFor="p4-contactInfoHeading"><Input id="p4-contactInfoHeading" value={content.page4.contactInfoHeading} onChange={e => onContentChange('page4', 'contactInfoHeading', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Title" htmlFor="p4-salesOfficeTitle"><Input id="p4-salesOfficeTitle" value={content.page4.contactSalesOfficeTitle} onChange={e => onContentChange('page4', 'contactSalesOfficeTitle', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Phone" htmlFor="p4-salesOfficePhone"><Input id="p4-salesOfficePhone" value={content.page4.contactSalesOfficePhone} onChange={e => onContentChange('page4', 'contactSalesOfficePhone', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Email" htmlFor="p4-salesOfficeEmail"><Input type="email" id="p4-salesOfficeEmail" value={content.page4.contactSalesOfficeEmail} onChange={e => onContentChange('page4', 'contactSalesOfficeEmail', e.target.value)} /></FieldSet>
            <FieldSet label="Sales Office Website" htmlFor="p4-salesOfficeWebsite"><Input type="url" id="p4-salesOfficeWebsite" value={content.page4.contactSalesOfficeWebsite} onChange={e => onContentChange('page4', 'contactSalesOfficeWebsite', e.target.value)} /></FieldSet>
            <FieldSet label="Site Office Title" htmlFor="p4-siteOfficeTitle"><Input id="p4-siteOfficeTitle" value={content.page4.contactSiteOfficeTitle} onChange={e => onContentChange('page4', 'contactSiteOfficeTitle', e.target.value)} /></FieldSet>
            <FieldSet label="Site Office Address" htmlFor="p4-siteOfficeAddress"><Textarea id="p4-siteOfficeAddress" value={content.page4.contactSiteOfficeAddress} onChange={e => onContentChange('page4', 'contactSiteOfficeAddress', e.target.value)} rows={2} /></FieldSet>
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
