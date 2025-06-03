
"use client";

import type { AmenityItem, BrochureContent } from '@/types/brochure';
import { defaultBrochureContent } from '@/config/brochure-defaults';
import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'brochureBuilderContent';

export function useBrochureContent() {
  const [content, setContentState] = useState<BrochureContent>(defaultBrochureContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedContent = defaultBrochureContent;
    try {
      const storedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        // Basic validation: check if it has a 'meta' property (can be expanded)
        if (parsedContent && typeof parsedContent === 'object' && 'meta' in parsedContent) {
          loadedContent = parsedContent as BrochureContent;
        } else {
          console.warn("Stored content is malformed, using defaults.");
          localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove malformed item
        }
      }
    } catch (error) {
      console.error("Failed to load or parse content from localStorage, using defaults:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove potentially corrupted item
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
    value: BrochureContent[K1][K2] | null // Allow null for clearing images
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
          { id: nanoid(), icon: '✨', text: 'New Amenity', imageUrl: null, imageAiHint: 'new amenity' }
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

  // Function to update list items specifically for page4.specsFeaturesItems
  const updatePage4SpecsFeaturesItem = useCallback((index: number, value: string) => {
    setContent(prevContent => {
      const list = prevContent.page4.specsFeaturesItems;
      if (!Array.isArray(list)) return prevContent;

      const newList = [...list];
      newList[index] = value;
      return {
        ...prevContent,
        page4: {
          ...prevContent.page4,
          specsFeaturesItems: newList,
        },
      };
    });
  }, [setContent]);


  const resetContent = useCallback(() => {
    setContent(defaultBrochureContent); // Directly use setContent which handles localStorage
  }, [setContent]);

  return { 
    content, 
    updateContent, 
    updateAmenityItem, 
    addAmenity,
    removeAmenity,
    updateListItem,
    updatePage4SpecsFeaturesItem, // Renamed for clarity
    resetContent, 
    isLoaded, 
    setContent // Expose setContent for direct manipulation if needed
  };
}
