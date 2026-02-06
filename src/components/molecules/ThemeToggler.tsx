import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppStore } from '../../store/useAppStore';

export const ThemeToggler = () => {
  const { themeMode, toggleTheme } = useAppStore();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <Tooltip title={`Alternar para modo ${themeMode === 'light' ? 'escuro' : 'claro'}`}>
        <IconButton 
          onClick={toggleTheme}
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
