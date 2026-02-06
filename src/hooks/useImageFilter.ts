import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import api from '../api/api';

type FilterType = 
  | 'marr-hildreth' 
  | 'canny' 
  | 'box-filter' 
  | 'freeman-chain' 
  | 'watershed' 
  | 'otsu' 
  | 'counting' 
  | 'segmentation';

interface FilterParams {
  [key: string]: any;
}

export const useImageFilter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { imageData, setProcessedImage, setIsProcessing } = useAppStore();

  const applyFilter = async (filterType: FilterType, params: FilterParams) => {
    if (!imageData.originalImage) {
      setError('Nenhuma imagem carregada');
      return;
    }

    setIsLoading(true);
    setIsProcessing(true);
    setError(null);

    try {
      let response;

      switch (filterType) {
        case 'marr-hildreth':
          response = await api.marrHildreth(imageData.originalImage, {
            sigma: params.sigma,
            threshold: params.threshold,
          });
          break;

        case 'canny':
          response = await api.canny(imageData.originalImage, {
            sigma: params.sigma,
            lowThreshold: params.lowThreshold,
            highThreshold: params.highThreshold,
          });
          break;

        case 'box-filter':
          response = await api.boxFilter(imageData.originalImage, {
            kernelSize: params.kernelSize,
          });
          break;

        case 'freeman-chain':
          response = await api.freemanChain(imageData.originalImage, {
            threshold: params.threshold,
          });
          // Freeman chain returns JSON, not an image
          if (response.success && response.data) {
            console.log('Freeman Chain Result:', response.data);
            setError('Freeman Chain processado! Veja o console para detalhes.');
          }
          break;

        case 'watershed':
          response = await api.watershed(imageData.originalImage, {
            sigma: params.sigma,
          });
          break;

        case 'otsu':
          response = await api.otsu(imageData.originalImage);
          break;

        case 'counting':
          response = await api.objectCount(imageData.originalImage, {
            threshold: params.threshold,
            method: params.method,
          });
          // Object count returns JSON
          if (response.success && response.data) {
            console.log('Object Count Result:', response.data);
            const countData = response.data as any;
            setError(`${countData.object_count} objetos encontrados usando ${countData.method}`);
          }
          break;

        case 'segmentation':
          response = await api.segmentation(imageData.originalImage);
          break;

        default:
          throw new Error(`Filtro desconhecido: ${filterType}`);
      }

      if (response.success && typeof response.data === 'string') {
        setProcessedImage(response.data);
      } else if (!response.success) {
        setError(response.error || 'Erro ao processar imagem');
      }
    } catch (error) {
      console.error('Error applying filter:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  return {
    applyFilter,
    isLoading,
    error,
  };
};

