import { Box, Typography } from '@mui/material';
import { ImageCanvas, ParameterPanel } from '../components/organisms';
import { FilterParameterGroup } from '../components/molecules';
import { useImageFilter } from '../hooks/useImageFilter';

export const OtsuPage = () => {
  const { applyFilter, isLoading } = useImageFilter();

  const handleApplyFilter = () => {
    applyFilter('otsu', {});
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Otsu Thresholding
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <ParameterPanel 
            title="Parâmetros do Filtro"
            onApplyFilter={handleApplyFilter}
            disabled={isLoading}
          >
            <FilterParameterGroup>
              <Typography variant="body2" color="text.secondary">
                Este filtro calcula automaticamente o threshold ótimo usando o método de Otsu.
                Não são necessários parâmetros adicionais.
              </Typography>
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
