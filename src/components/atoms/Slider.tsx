import { Slider as MuiSlider, type SliderProps, Typography, Box } from '@mui/material';

interface CustomSliderProps extends Omit<SliderProps, 'onChange'> {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  ...props 
}: CustomSliderProps) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}: {value}
      </Typography>
      <MuiSlider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        {...props}
      />
    </Box>
  );
};
