import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';

type LabelInputProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
  errors: FieldErrors<T>;
};

export const LabelInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  errors,
  className,
}: LabelInputProps<T>) => (
  <div className={`space-y-2 ${className || ''}`}>
    <Label>{label}</Label>
    <Input placeholder={placeholder} {...register(name)} />
    {errors && (
      <p className="text-sm text-red-500">{errors[name]?.message as string}</p>
    )}
  </div>
);
