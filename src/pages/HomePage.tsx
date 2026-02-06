import { Box, Typography, Paper } from '@mui/material';
import { ImageCanvas } from '../components/organisms';

export const HomePage = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
        Processamento de Imagens Digitais
      </Typography>
      
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Bem-vindo ao PID Tools
        </Typography>
        <Typography variant="body1" paragraph>
          Esta ferramenta oferece diversos filtros e algoritmos para processamento digital de imagens.
        </Typography>
        <Typography variant="body1" paragraph>
          Navegue pelo menu lateral para acessar os filtros disponíveis:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li><Typography variant="body1"><strong>Marr-Hildreth:</strong> Detecção de bordas baseada em LoG (Laplacian of Gaussian)</Typography></li>
          <li><Typography variant="body1"><strong>Canny:</strong> Detector de bordas multi-estágio</Typography></li>
          <li><Typography variant="body1"><strong>Filtros Box:</strong> Suavização com kernels de diferentes tamanhos</Typography></li>
          <li><Typography variant="body1"><strong>Cadeia de Freeman:</strong> Codificação de contornos</Typography></li>
          <li><Typography variant="body1"><strong>Watershed:</strong> Segmentação baseada em marcadores</Typography></li>
          <li><Typography variant="body1"><strong>Otsu:</strong> Limiarização automática</Typography></li>
          <li><Typography variant="body1"><strong>Contagem:</strong> Contagem de objetos na imagem</Typography></li>
          <li><Typography variant="body1"><strong>Segmentação:</strong> Separação de regiões de interesse</Typography></li>
        </Box>
      </Paper>

      <ImageCanvas />
    </Box>
  );
};
