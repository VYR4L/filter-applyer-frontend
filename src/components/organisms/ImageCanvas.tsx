import { Box, Paper, Typography, Skeleton, Grid } from '@mui/material';
import { useAppStore } from '../../store/useAppStore';

export const ImageCanvas = () => {
  const { imageData, isProcessing } = useAppStore();

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Original Image */}
        <Grid size={{xs: 12, md:6}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Imagem Original
            </Typography>
            {imageData.originalImage ? (
              <Box
                component="img"
                src={imageData.originalImage}
                alt="Original"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'action.hover',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Nenhuma imagem carregada
                </Typography>
              </Box>
            )}
            {imageData.fileName && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {imageData.fileName}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Processed Image */}
        <Grid size={{xs: 12, md:6}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Imagem Processada
            </Typography>
            {isProcessing ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
            ) : imageData.processedImage ? (
              <Box
                component="img"
                src={imageData.processedImage}
                alt="Processed"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'action.hover',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Aguardando processamento
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
