import { Chip, type ChipProps } from '@mui/material';

interface BadgeProps extends ChipProps {
  text: string;
  variant?: 'filled' | 'outlined';
}

export const Badge = ({ text, variant = 'filled', ...props }: BadgeProps) => {
  return (
    <Chip
      label={text}
      variant={variant}
      size="small"
      sx={{ 
        fontWeight: 500,
        ...props.sx 
      }}
      {...props}
    />
  );
};
