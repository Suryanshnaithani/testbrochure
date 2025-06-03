
"use client";

import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageDropzoneProps {
  onFileChange: (dataUri: string | null) => void;
  currentImage?: string | null; // data URI or URL
  label: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'logo'; // For styling the dropzone box
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
    } else if (file === null) { // Explicitly cleared
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
    if (!isDragging) setIsDragging(true); // Ensure dragging state is true
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
    e.stopPropagation(); // Prevent click from triggering file input
    handleFileProcess(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
    }
  };
  
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      case 'logo': return 'aspect-[2.5/1] max-h-24'; // specific for logos, e.g., 150x60
      default: return 'aspect-video'; // landscape
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
          preview ? 'border-solid' : ''
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
            <img src={preview} alt="Preview" className="object-contain w-full h-full rounded-md" />
            {clearable && (
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearImage}
                    className="absolute top-1 right-1 h-6 w-6 bg-background/70 hover:bg-destructive/80 hover:text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Clear image"
                >
                    <XCircle className="h-4 w-4" />
                </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <UploadCloud className={cn("h-10 w-10 mb-2", isDragging ? "text-primary" : "text-muted-foreground")} />
            <p className={cn("text-sm font-medium", isDragging ? "text-primary" : "text-muted-foreground")}>
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground/80">{label}</p>
          </div>
        )}
      </div>
    </div>
  );
};
