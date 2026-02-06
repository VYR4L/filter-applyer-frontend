import { useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { Slider } from '../components/atoms';
import { FilterParameterGroup } from '../components/molecules';
import { useImageFilter } from '../hooks/useImageFilter';
import { useAppStore } from '../store/useAppStore';

export const FreemanChainPage = () => {
  const [threshold, setThreshold] = useState(128);
  
  const { applyFilter, isLoading } = useImageFilter();
  const { jsonResult } = useAppStore();

  const handleApplyFilter = () => {
    applyFilter('freeman-chain', { threshold });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Cadeia de Freeman
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <ParameterPanel 
            title="Parâmetros do Filtro"
            onApplyFilter={handleApplyFilter}
            disabled={isLoading}
          >
            <FilterParameterGroup>
              <Slider
                label="Threshold"
                value={threshold}
                onChange={setThreshold}
                min={0}
                max={255}
                step={1}
              />
            </FilterParameterGroup>
          </ParameterPanel>
        </Box>
        
        <Box sx={{ flex: 2 }}>
          <ImageCanvas />
          
          {jsonResult && (
            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Resultados da Cadeia de Freeman
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="body1">
                  <strong>Limiar aplicado:</strong> {jsonResult.threshold_used}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: 'primary.main' }}>
                  <strong>Total de contornos encontrados:</strong> {jsonResult.contours?.length || 0}
                </Typography>
                
                {jsonResult.contours && jsonResult.contours.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Detalhes dos contornos:</strong>
                    </Typography>
                    <Box sx={{ maxHeight: 400, overflowY: 'auto', bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                      {jsonResult.contours.map((contour: any, index: number) => (
                        <Box key={index} sx={{ mb: 3, pb: 2, borderBottom: index < jsonResult.contours.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                            Contorno {index + 1}
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                            • <strong>Ponto inicial:</strong> ({contour.start_point[0]}, {contour.start_point[1]})
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                            • <strong>Comprimento:</strong> {contour.length} pixels
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                            • <strong>Chain Code ({contour.chain_code.length} direções):</strong>
                          </Typography>
                          <Box sx={{ ml: 4, p: 1, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem', maxHeight: 100, overflowY: 'auto' }}>
                            {contour.chain_code.join(', ')}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};
