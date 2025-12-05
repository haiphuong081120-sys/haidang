// Image optimization utilities
export const optimizeImage = (src: string, width?: number, quality = 75): string => {
  if (!src) return '';
  
  // If using CDN or image service, add optimization params
  const url = new URL(src, window.location.origin);
  
  if (width) {
    url.searchParams.set('w', width.toString());
  }
  url.searchParams.set('q', quality.toString());
  url.searchParams.set('auto', 'format');
  
  return url.toString();
};

// Lazy load images with Intersection Observer
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        if (target.dataset.src) {
          target.src = target.dataset.src;
          target.removeAttribute('data-src');
          observer.unobserve(target);
        }
      }
    });
  }, {
    rootMargin: '50px',
  });
  
  observer.observe(img);
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Convert images to WebP if supported
export const supportsWebP = async (): Promise<boolean> => {
  if (!window.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};
