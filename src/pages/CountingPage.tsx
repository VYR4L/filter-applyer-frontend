import { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { FilterParameterGroup } from '../components/molecules';
import { Slider } from '../components/atoms';
import { useImageFilter } from '../hooks/useImageFilter';

export const CountingPage = () => {
  const [threshold, setThreshold] = useState(127);
  const [method, setMethod] = useState<'ccl' | 'freeman'>('ccl');
  const { applyFilter, isLoading, error } = useImageFilter();

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
        </Box>
      </Box>
    </Box>
  );
};

