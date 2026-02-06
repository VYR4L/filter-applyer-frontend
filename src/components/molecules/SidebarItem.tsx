import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export const SidebarItem = ({ text, icon, path }: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isActive}
        onClick={() => navigate(path)}
        sx={{
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {icon}
        </ListItemIcon>
        <ListItemText 
          primary={text}
          primaryTypographyProps={{
            fontSize: '0.9rem',
            fontWeight: isActive ? 600 : 500,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
