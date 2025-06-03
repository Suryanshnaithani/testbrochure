
"use client";

import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, Image as ImageIconLucide, XCircle } from 'lucide-react'; // Renamed to avoid conflict
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageDropzoneProps {
  onFileChange: (dataUri: string | null) => void;
  currentImage?: string | null; // data URI or URL
  label: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'logo';
  clearable?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileChange,
  currentImage,
  label,
  className,
  aspectRatio = 'landscape',
  clearable = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileProcess = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreview(dataUri);
        onFileChange(dataUri);
      };
      reader.readAsDataURL(file);
    } else if (file === null) { 
        setPreview(null);
        onFileChange(null);
    }
  }, [onFileChange]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleClearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    handleFileProcess(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
  };
  
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      case 'logo': return 'aspect-[2.5/1] max-h-24'; 
      default: return 'aspect-video'; 
    }
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <div
        className={cn(
          "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer transition-colors",
          getAspectRatioClass(),
          isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/70',
          preview ? 'border-solid border-primary/30' : 'bg-muted/30 hover:bg-muted/50' // Subtle bg for empty state
        )}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        {preview ? (
          <>
            <img src={preview} alt={`${label} Preview`} className="object-contain w-full h-full rounded-md" />
            {clearable && (
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearImage}
                    className="absolute top-1.5 right-1.5 h-7 w-7 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    aria-label={`Clear ${label}`}
                >
                    <XCircle className="h-5 w-5" />
                </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-3 h-full">
            <ImageIconLucide className={cn("h-8 w-8 mb-2", isDragging ? "text-primary" : "text-muted-foreground/60")} />
            <p className={cn("text-xs font-medium", isDragging ? "text-primary" : "text-muted-foreground/90")}>
              {label}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              Drag & drop or click
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
