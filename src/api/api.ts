/**
 * API Client for Image Processing Backend
 * Base URL should be configured via environment variable
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Marr-Hildreth Parameters
interface MarrHildrethParams {
  sigma: number;
  threshold: number;
}

// Canny Parameters
interface CannyParams {
  sigma: number;
  lowThreshold: number;
  highThreshold: number;
}

// Watershed Parameters
interface WatershedParams {
  sigma: number;
}

// Freeman Chain Parameters
interface FreemanChainParams {
  threshold: number;
}

// Box Filter Parameters
interface BoxFilterParams {
  kernelSize: string; // "3x3", "5x5", etc
}

// Object Count Parameters
interface ObjectCountParams {
  threshold: number;
  method: 'ccl' | 'freeman';
}

// Freeman Chain Response
interface FreemanChainResponse {
  contours: Array<{
    start_point: [number, number];
    chain_code: number[];
    length: number;
  }>;
  threshold_used: number;
}

// Object Count Response
interface ObjectCountResponse {
  object_count: number;
  threshold_used: number;
  method: string;
  contours?: Array<{
    start_point: [number, number];
    chain_code: number[];
    length: number;
  }>;
}

/**
 * Convert base64 image to File object
 */
const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Generic function to send image processing request
 */
const processImage = async <T = string>(
  endpoint: string,
  imageBase64: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  try {
    const formData = new FormData();
    const imageFile = base64ToFile(imageBase64, 'image.jpg');
    formData.append('file', imageFile);
    
    // Append other parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        formData.append(key, params[key].toString());
      }
    });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON or image
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return { success: true, data };
    } else {
      // Image response - convert to base64
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      return { success: true, data: base64 as T };
    }
  } catch (error) {
    console.error(`Error processing ${endpoint}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * API Functions for each filter
 */
export const api = {
  /**
   * Apply Marr-Hildreth edge detection
   */
  marrHildreth: async (
    imageBase64: string,
    params: MarrHildrethParams
  ): Promise<ApiResponse<string>> => {
    return processImage('/marr-hildreth/process', imageBase64, {
      sigma: params.sigma,
      threshold: params.threshold,
    });
  },

  /**
   * Apply Canny edge detection
   */
  canny: async (
    imageBase64: string,
    params: CannyParams
  ): Promise<ApiResponse<string>> => {
    return processImage('/canny/process', imageBase64, {
      sigma: params.sigma,
      low_threshold: params.lowThreshold,
      high_threshold: params.highThreshold,
    });
  },

  /**
   * Apply Otsu thresholding
   */
  otsu: async (imageBase64: string): Promise<ApiResponse<string>> => {
    return processImage('/otsu-method/process', imageBase64);
  },

  /**
   * Apply Watershed segmentation
   */
  watershed: async (
    imageBase64: string,
    params: WatershedParams
  ): Promise<ApiResponse<string>> => {
    return processImage('/watershed/process', imageBase64, {
      gaussian_sigma: params.sigma,
    });
  },

  /**
   * Apply Freeman Chain Code
   */
  freemanChain: async (
    imageBase64: string,
    params: FreemanChainParams
  ): Promise<ApiResponse<FreemanChainResponse>> => {
    return processImage<FreemanChainResponse>('/freeman-chain/process', imageBase64, {
      threshold: params.threshold,
    });
  },

  /**
   * Count objects in image
   */
  objectCount: async (
    imageBase64: string,
    params: ObjectCountParams
  ): Promise<ApiResponse<ObjectCountResponse>> => {
    return processImage<ObjectCountResponse>('/object-count/process', imageBase64, {
      threshold: params.threshold,
      method: params.method,
    });
  },

  /**
   * Apply Box filter
   */
  boxFilter: async (
    imageBase64: string,
    params: BoxFilterParams
  ): Promise<ApiResponse<string>> => {
    // Convert "3x3" to 3
    const size = parseInt(params.kernelSize.split('x')[0]);
    return processImage('/box-filter/process', imageBase64, {
      box_size: size,
    });
  },

  /**
   * Apply intensity segmentation
   */
  segmentation: async (imageBase64: string): Promise<ApiResponse<string>> => {
    return processImage('/segmentation/process', imageBase64);
  },

  /**
   * Health check
   */
  health: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed',
      };
    }
  },
};

export default api;
