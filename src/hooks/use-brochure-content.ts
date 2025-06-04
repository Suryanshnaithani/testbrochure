
"use client";

import type { AmenityItem, BrochureContent, FloorPlanItem } from '@/types/brochure';
import { defaultBrochureContent } from '@/config/brochure-defaults';
import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'brochureBuilderContent_v2'; // Changed key for new structure

export function useBrochureContent() {
  const [content, setContentState] = useState<BrochureContent>(defaultBrochureContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedContent = defaultBrochureContent;
    try {
      const storedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        // Basic validation: check if it has a 'meta' and 'page4.floorPlans' (array)
        if (
            parsedContent && 
            typeof parsedContent === 'object' && 
            'meta' in parsedContent &&
            parsedContent.page4 &&
            Array.isArray(parsedContent.page4.floorPlans) // Key check for new structure
        ) {
          loadedContent = parsedContent as BrochureContent;
        } else {
          console.warn("Stored content is malformed or outdated, using defaults.");
          localStorage.removeItem(LOCAL_STORAGE_KEY); 
        }
      }
    } catch (error) {
      console.error("Failed to load or parse content from localStorage, using defaults:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY); 
    }
    setContentState(loadedContent);
    setIsLoaded(true);
  }, []);

  const setContent = useCallback((newContent: BrochureContent | ((prevState: BrochureContent) => BrochureContent)) => {
    setContentState(prevContent => {
      const updatedContent = typeof newContent === 'function' ? newContent(prevContent) : newContent;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      } catch (error) {
        console.error("Failed to save content to localStorage:", error);
      }
      return updatedContent;
    });
  }, []);
  
  const updateContent = useCallback(<K1 extends keyof BrochureContent, K2 extends keyof BrochureContent[K1]>(
    pageKey: K1,
    fieldKey: K2,
    value: BrochureContent[K1][K2] | null 
  ) => {
    setContent(prevContent => ({
      ...prevContent,
      [pageKey]: {
        ...prevContent[pageKey],
        [fieldKey]: value,
      },
    }));
  }, [setContent]);
  
  const updateAmenityItem = useCallback((amenityId: string, field: keyof AmenityItem, value: string | null) => {
    setContent(prevContent => ({
      ...prevContent,
      page3: {
        ...prevContent.page3,
        amenities: prevContent.page3.amenities.map(amenity =>
          amenity.id === amenityId ? { ...amenity, [field]: value } : amenity
        ),
      },
    }));
  }, [setContent]);

  const addAmenity = useCallback(() => {
    setContent(prevContent => ({
      ...prevContent,
      page3: {
        ...prevContent.page3,
        amenities: [
          ...prevContent.page3.amenities,
          { id: nanoid(), icon: '🌟', text: 'New Amazing Amenity', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'new amenity' }
        ],
      },
    }));
  }, [setContent]);

  const removeAmenity = useCallback((amenityId: string) => {
    setContent(prevContent => ({
      ...prevContent,
      page3: {
        ...prevContent.page3,
        amenities: prevContent.page3.amenities.filter(amenity => amenity.id !== amenityId),
      },
    }));
  }, [setContent]);

  const updateListItem = useCallback(<K1 extends keyof Exclude<BrochureContent, 'page3' | 'page4'>, K2 extends keyof Exclude<BrochureContent, 'page3' | 'page4'>[K1]>(
    pageKey: K1,
    fieldKey: K2, 
    index: number,
    value: string
  ) => {
    setContent(prevContent => {
      const pageData = prevContent[pageKey];
      if (!pageData || typeof pageData !== 'object') return prevContent;
      
      const list = (pageData as any)[fieldKey] as string[];
      if (!Array.isArray(list)) return prevContent; 

      const newList = [...list];
      newList[index] = value;
      return {
        ...prevContent,
        [pageKey]: {
          ...(prevContent[pageKey] as object),
          [fieldKey]: newList,
        },
      };
    });
  }, [setContent]);

  const addFloorPlan = useCallback(() => {
    setContent(prevContent => ({
      ...prevContent,
      page4: {
        ...prevContent.page4,
        floorPlans: [
          ...prevContent.page4.floorPlans,
          {
            id: nanoid(),
            name: 'New Floor Plan Type',
            floorPlanImage: 'https://placehold.co/500x350.png',
            floorPlanImageAiHint: 'blank floor plan',
            specsHeading: 'Specifications',
            specsCarpetArea: '0 sq. ft.',
            specsBuiltUpArea: '0 sq. ft.',
            specsBalconyArea: '0 sq. ft.',
            specsConfiguration: 'TBD',
            specsFeaturesTitle: 'Features:',
            specsFeaturesItems: ['Feature 1', 'Feature 2'],
          }
        ],
      },
    }));
  }, [setContent]);

  const removeFloorPlan = useCallback((floorPlanId: string) => {
    setContent(prevContent => ({
      ...prevContent,
      page4: {
        ...prevContent.page4,
        floorPlans: prevContent.page4.floorPlans.filter(fp => fp.id !== floorPlanId),
      },
    }));
  }, [setContent]);

  const updateFloorPlanItem = useCallback((floorPlanId: string, field: keyof Omit<FloorPlanItem, 'id' | 'specsFeaturesItems'>, value: string | null) => {
    setContent(prevContent => ({
      ...prevContent,
      page4: {
        ...prevContent.page4,
        floorPlans: prevContent.page4.floorPlans.map(fp =>
          fp.id === floorPlanId ? { ...fp, [field]: value } : fp
        ),
      },
    }));
  }, [setContent]);

  const updateFloorPlanListItem = useCallback((floorPlanId: string, itemIndex: number, value: string) => {
    setContent(prevContent => ({
      ...prevContent,
      page4: {
        ...prevContent.page4,
        floorPlans: prevContent.page4.floorPlans.map(fp => {
          if (fp.id === floorPlanId) {
            const newList = [...fp.specsFeaturesItems];
            newList[itemIndex] = value;
            return { ...fp, specsFeaturesItems: newList };
          }
          return fp;
        }),
      },
    }));
  }, [setContent]);
  
  const resetContent = useCallback(() => {
    setContent(defaultBrochureContent); 
  }, [setContent]);

  return { 
    content, 
    updateContent, 
    updateAmenityItem, 
    addAmenity,
    removeAmenity,
    updateListItem,
    // Floor plan specific functions
    addFloorPlan,
    removeFloorPlan,
    updateFloorPlanItem,
    updateFloorPlanListItem,
    resetContent, 
    isLoaded, 
    setContent 
  };
}
