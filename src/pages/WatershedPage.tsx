import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { ParameterInput } from '../components/atoms';
import { FilterParameterGroup } from '../components/molecules';
import { useImageFilter } from '../hooks/useImageFilter';

export const WatershedPage = () => {
  const [sigma, setSigma] = useState(1.0);
  
  const { applyFilter, isLoading } = useImageFilter();

  const handleApplyFilter = () => {
    applyFilter('watershed', { sigma });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Watershed Segmentation
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <ParameterPanel 
            title="Parâmetros do Filtro"
            onApplyFilter={handleApplyFilter}
            disabled={isLoading}
          >
            <FilterParameterGroup>
              <ParameterInput
                label="Sigma (Desvio Padrão)"
                value={sigma}
                onChange={(value) => setSigma(value as number)}
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 10 }}
              />
            </FilterParameterGroup>
          </ParameterPanel>
        </Box>
        
        <Box sx={{ flex: 2 }}>
          <ImageCanvas />
        </Box>
      </Box>
    </Box>
  );
};
