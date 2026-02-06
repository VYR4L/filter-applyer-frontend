import { Box, Button, Paper, Typography } from '@mui/material';
import { Upload, Clear } from '@mui/icons-material';
import { useAppStore } from '../../store/useAppStore';

interface ParameterPanelProps {
  title: string;
  children: React.ReactNode;
  onApplyFilter: () => void;
  disabled?: boolean;
}

export const ParameterPanel = ({ 
  title, 
  children, 
  onApplyFilter,
  disabled = false 
}: ParameterPanelProps) => {
  const { imageData, clearImages, setOriginalImage } = useAppStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>

      {/* Image Upload */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<Upload />}
          fullWidth
          sx={{ mb: 1 }}
        >
          Carregar Imagem
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
        {imageData.originalImage && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            fullWidth
            onClick={clearImages}
          >
            Limpar Imagens
          </Button>
        )}
      </Box>

      {/* Filter Parameters */}
      {children}

      {/* Apply Button */}
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={onApplyFilter}
        disabled={disabled || !imageData.originalImage}
        sx={{ mt: 2 }}
      >
        Aplicar Filtro
      </Button>
    </Paper>
  );
};
