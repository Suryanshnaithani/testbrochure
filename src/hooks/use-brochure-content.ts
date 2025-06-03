
"use client";

import type { BrochureContent } from '@/types/brochure';
import { defaultBrochureContent } from '@/config/brochure-defaults';
import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'brochureBuilderContent';

export function useBrochureContent() {
  const [content, setContent] = useState<BrochureContent>(defaultBrochureContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      }
    } catch (error) {
      console.error("Failed to load content from localStorage:", error);
      // Fallback to default content if parsing fails or localStorage is unavailable
      setContent(defaultBrochureContent);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
      } catch (error) {
        console.error("Failed to save content to localStorage:", error);
      }
    }
  }, [content, isLoaded]);

  const updateContent = useCallback(<K1 extends keyof BrochureContent, K2 extends keyof BrochureContent[K1]>(
    pageKey: K1,
    fieldKey: K2,
    value: BrochureContent[K1][K2]
  ) => {
    setContent(prevContent => ({
      ...prevContent,
      [pageKey]: {
        ...prevContent[pageKey],
        [fieldKey]: value,
      },
    }));
  }, []);
  
  const updateAmenityText = useCallback((amenityId: string, newText: string) => {
    setContent(prevContent => ({
      ...prevContent,
      page3: {
        ...prevContent.page3,
        amenities: prevContent.page3.amenities.map(amenity =>
          amenity.id === amenityId ? { ...amenity, text: newText } : amenity
        ),
      },
    }));
  }, []);

  const updateListItem = useCallback(<K1 extends keyof BrochureContent, K2 extends keyof BrochureContent[K1]>(
    pageKey: K1,
    fieldKey: K2, // This must be a key pointing to an array of strings
    index: number,
    value: string
  ) => {
    setContent(prevContent => {
      const list = prevContent[pageKey][fieldKey] as unknown as string[];
      if (!Array.isArray(list)) return prevContent; // Type guard

      const newList = [...list];
      newList[index] = value;
      return {
        ...prevContent,
        [pageKey]: {
          ...prevContent[pageKey],
          [fieldKey]: newList,
        },
      };
    });
  }, []);


  const resetContent = useCallback(() => {
    setContent(defaultBrochureContent);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove content from localStorage:", error);
    }
  }, []);

  return { content, updateContent, updateAmenityText, updateListItem, resetContent, isLoaded, setContent };
}
