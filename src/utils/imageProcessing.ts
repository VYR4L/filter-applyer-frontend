/**
 * Utility functions for image processing
 * This file will contain helper functions for image manipulation
 * and conversion between different formats
 */

export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = (base64: string): Blob => {
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
};

export const downloadImage = (base64Image: string, filename: string) => {
  const link = document.createElement('a');
  link.href = base64Image;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Freeman Chain Code directions
 * 0: East, 1: NE, 2: North, 3: NW, 4: West, 5: SW, 6: South, 7: SE
 */
export const FREEMAN_DIRECTIONS = {
  EAST: 0,
  NORTHEAST: 1,
  NORTH: 2,
  NORTHWEST: 3,
  WEST: 4,
  SOUTHWEST: 5,
  SOUTH: 6,
  SOUTHEAST: 7,
};

// TODO: Implement actual image processing algorithms
// This file is prepared for future implementation of:
// - Freeman chain encoding
// - Image filters
// - Edge detection algorithms
// - Segmentation utilities
