import { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Divider } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { FilterParameterGroup } from '../components/molecules';
import { Slider } from '../components/atoms';
import { useImageFilter } from '../hooks/useImageFilter';
import { useAppStore } from '../store/useAppStore';

export const CountingPage = () => {
  const [threshold, setThreshold] = useState(127);
  const [method, setMethod] = useState<'ccl' | 'freeman'>('ccl');
  const { applyFilter, isLoading, error } = useImageFilter();
  const { jsonResult } = useAppStore();

  const handleApplyFilter = () => {
    applyFilter('counting', { threshold, method });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Contagem de Objetos
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <ParameterPanel 
            title="Parâmetros do Filtro"
            onApplyFilter={handleApplyFilter}
            disabled={isLoading}
          >
            <FilterParameterGroup>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Método de Contagem
                </FormLabel>
                <RadioGroup
                  value={method}
                  onChange={(e) => setMethod(e.target.value as 'ccl' | 'freeman')}
                >
                  <FormControlLabel 
                    value="ccl" 
                    control={<Radio />} 
                    label="Connected Component Labeling (CCL)" 
                  />
                  <FormControlLabel 
                    value="freeman" 
                    control={<Radio />} 
                    label="Freeman Chain Code" 
                  />
                </RadioGroup>
              </FormControl>

              <Slider
                label="Limiar de Binarização"
                value={threshold}
                onChange={setThreshold}
                min={0}
                max={255}
                step={1}
              />
            </FilterParameterGroup>
            
            {error && (
              <Typography variant="body2" color="info.main" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </ParameterPanel>
        </Box>
        
        <Box sx={{ flex: 2 }}>
          <ImageCanvas />
          
          {jsonResult && (
            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Resultados da Contagem
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="body1">
                  <strong>Método utilizado:</strong> {jsonResult.method === 'ccl' ? 'Connected Component Labeling' : 'Freeman Chain Code'}
                </Typography>
                <Typography variant="body1">
                  <strong>Limiar aplicado:</strong> {jsonResult.threshold_used}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: 'primary.main' }}>
                  <strong>Total de objetos encontrados:</strong> {jsonResult.object_count}
                </Typography>
                
                {jsonResult.contours && jsonResult.contours.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Contornos detectados:</strong> {jsonResult.contours.length}
                    </Typography>
                    <Box sx={{ maxHeight: 300, overflowY: 'auto', bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                      {jsonResult.contours.map((contour: any, index: number) => (
                        <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < jsonResult.contours.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                          <Typography variant="body2">
                            <strong>Contorno {index + 1}:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Ponto inicial: ({contour.start_point[0]}, {contour.start_point[1]})
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Comprimento: {contour.length} pixels
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Chain code: [{contour.chain_code.slice(0, 20).join(', ')}{contour.chain_code.length > 20 ? '...' : ''}]
                          </Typography>
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

