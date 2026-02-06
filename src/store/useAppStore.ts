import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ImageData {
  originalImage: string | null;
  processedImage: string | null;
  fileName: string | null;
}

interface AppState {
  // Theme
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Image
  imageData: ImageData;
  setOriginalImage: (image: string, fileName: string) => void;
  setProcessedImage: (image: string) => void;
  clearImages: () => void;
  
  // Loading state
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      themeMode: 'light',
      toggleTheme: () =>
        set((state) => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),
      
      // Image
      imageData: {
        originalImage: null,
        processedImage: null,
        fileName: null,
      },
      setOriginalImage: (image: string, fileName: string) =>
        set((state) => ({
          imageData: {
            ...state.imageData,
            originalImage: image,
            fileName,
            processedImage: null,
          },
        })),
      setProcessedImage: (image: string) =>
        set((state) => ({
          imageData: {
            ...state.imageData,
            processedImage: image,
          },
        })),
      clearImages: () =>
        set({
          imageData: {
            originalImage: null,
            processedImage: null,
            fileName: null,
          },
        }),
      
      // Loading
      isProcessing: false,
      setIsProcessing: (processing: boolean) =>
        set({ isProcessing: processing }),
    }),
    {
      name: 'pdi-app-storage',
      partialize: (state) => ({ themeMode: state.themeMode }),
    }
  )
);
