import { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { FilterParameterGroup } from '../components/molecules';
import { ParameterInput } from '../components/atoms';
import { useImageFilter } from '../hooks/useImageFilter';

export const BoxFiltersPage = () => {
  const [kernelSize, setKernelSize] = useState<string>('3x3');
  const [customSize, setCustomSize] = useState<number>(3);
  
  const { applyFilter, isLoading } = useImageFilter();

  const handleApplyFilter = () => {
    const finalSize = kernelSize === 'custom' ? `${customSize}x${customSize}` : kernelSize;
    applyFilter('box-filter', { kernelSize: finalSize });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Filtros Box
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <ParameterPanel 
            title="Parâmetros do Filtro"
            onApplyFilter={handleApplyFilter}
            disabled={isLoading}
          >
            <FilterParameterGroup>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tamanho do Kernel</InputLabel>
                <Select
                  value={kernelSize}
                  label="Tamanho do Kernel"
                  onChange={(e) => setKernelSize(e.target.value)}
                >
                  <MenuItem value="2x2">2x2</MenuItem>
                  <MenuItem value="3x3">3x3</MenuItem>
                  <MenuItem value="5x5">5x5</MenuItem>
                  <MenuItem value="7x7">7x7</MenuItem>
                  <MenuItem value="custom">Custom (NxN)</MenuItem>
                </Select>
              </FormControl>
              
              {kernelSize === 'custom' && (
                <ParameterInput
                  label="Tamanho Custom (N)"
                  value={customSize}
                  onChange={(value) => setCustomSize(value as number)}
                  type="number"
                  inputProps={{ step: 1, min: 1, max: 50 }}
                />
              )}
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
