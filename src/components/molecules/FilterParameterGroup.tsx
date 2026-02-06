import { Box, Typography, Paper } from '@mui/material';

interface FilterParameterGroupProps {
  title?: string;
  children: React.ReactNode;
}

export const FilterParameterGroup = ({ 
  title = 'Parâmetros', 
  children 
}: FilterParameterGroupProps) => {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3,
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Box>
        {children}
      </Box>
    </Paper>
  );
};
