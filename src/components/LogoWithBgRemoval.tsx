
import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface LogoWithBgRemovalProps {
  originalSrc: string;
  alt: string;
  className?: string;
}

export const LogoWithBgRemoval = ({ originalSrc, alt, className }: LogoWithBgRemovalProps) => {
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        setError(null);
        
        // Fetch the original image
        const response = await fetch(originalSrc);
        const blob = await response.blob();
        
        // Load as HTMLImageElement
        const img = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(img);
        
        // Create URL for processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedLogoUrl(processedUrl);
        
      } catch (err) {
        console.error('Error processing logo:', err);
        setError('Failed to process logo');
        // Fallback to original image
        setProcessedLogoUrl(originalSrc);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();

    // Cleanup URL when component unmounts
    return () => {
      if (processedLogoUrl && processedLogoUrl !== originalSrc) {
        URL.revokeObjectURL(processedLogoUrl);
      }
    };
  }, [originalSrc]);

  if (isProcessing) {
    return (
      <div className={`${className} bg-gradient-to-r from-accent-teal to-light-teal rounded-full flex items-center justify-center animate-pulse`}>
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <img 
      src={processedLogoUrl || originalSrc}
      alt={alt}
      className={className}
      onError={() => setProcessedLogoUrl(originalSrc)}
    />
  );
};
