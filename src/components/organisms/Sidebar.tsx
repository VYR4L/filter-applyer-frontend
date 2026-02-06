import { Drawer, List, Box, Typography, Divider } from '@mui/material';
import { 
  BlurOn, 
  Gradient, 
  FilterVintage, 
  ShowChart,
  Water,
  Crop,
  GridOn,
  Home
} from '@mui/icons-material';
import { SidebarItem, ThemeToggler } from '../molecules';

const SIDEBAR_WIDTH = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  isMobile: boolean;
}

export const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          PID Tools
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Processamento de Imagens Digitais
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
        <List>
          <SidebarItem text="Início" icon={<Home />} path="/" />
          <SidebarItem text="Marr-Hildreth" icon={<BlurOn />} path="/marr-hildreth" />
          <SidebarItem text="Canny" icon={<Gradient />} path="/canny" />
          <SidebarItem text="Filtros Box" icon={<GridOn />} path="/box-filters" />
          <SidebarItem text="Cadeia de Freeman" icon={<ShowChart />} path="/freeman-chain" />
          <SidebarItem text="Watershed" icon={<Water />} path="/watershed" />
          <SidebarItem text="Otsu" icon={<FilterVintage />} path="/otsu" />
          <SidebarItem text="Contagem" icon={<Crop />} path="/counting" />
          <SidebarItem text="Segmentação" icon={<Crop />} path="/segmentation" />
        </List>
      </Box>

      <Divider />

      {/* Theme Toggler */}
      <ThemeToggler />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}
    >
      {/* Drawer temporário para mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Melhor performance em mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer permanente para desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
