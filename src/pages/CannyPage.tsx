import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { ParameterInput } from '../components/atoms';
import { FilterParameterGroup } from '../components/molecules';
import { useImageFilter } from '../hooks/useImageFilter';

export const CannyPage = () => {
  const [sigma, setSigma] = useState(1.0);
  const [lowThreshold, setLowThreshold] = useState(0.1);
  const [highThreshold, setHighThreshold] = useState(0.3);
  
  const { applyFilter, isLoading } = useImageFilter();

  const handleApplyFilter = () => {
    applyFilter('canny', { sigma, lowThreshold, highThreshold });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Canny Edge Detection
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
              <ParameterInput
                label="Low Threshold"
                value={lowThreshold}
                onChange={(value) => setLowThreshold(value as number)}
                type="number"
                inputProps={{ step: 0.01, min: 0, max: 1 }}
              />
              <ParameterInput
                label="High Threshold"
                value={highThreshold}
                onChange={(value) => setHighThreshold(value as number)}
                type="number"
                inputProps={{ step: 0.01, min: 0, max: 1 }}
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
