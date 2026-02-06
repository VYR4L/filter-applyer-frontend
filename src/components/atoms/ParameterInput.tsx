import { TextField, type TextFieldProps } from '@mui/material';

interface ParameterInputProps extends Omit<TextFieldProps, 'onChange'> {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  type?: 'number' | 'text';
}

export const ParameterInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'number',
  ...props 
}: ParameterInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    onChange(newValue);
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      variant="outlined"
      sx={{ mb: 2 }}
      {...props}
    />
  );
};
