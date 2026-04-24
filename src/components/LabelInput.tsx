import { FieldValues } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LabelInputProps } from '../data/types/components';

export const LabelInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  errors,
  inputType = 'text',
  className,
}: LabelInputProps<T>) => (
  <div className={`space-y-2 ${className || ''}`}>
    <Label>{label}</Label>
    <Input type={inputType} placeholder={placeholder} {...register(name)} />
    {errors && (
      <p className="text-sm text-red-500">{errors[name]?.message as string}</p>
    )}
  </div>
);
