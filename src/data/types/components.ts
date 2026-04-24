import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export type TabHeaderProps = {
  description: string;
  buttonText: string;
  onClick: () => void;
};

export type ProvidersProps = { children: React.ReactNode };

export type LabelInputProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  inputType?: string;
  className?: string;
};

export type ConfirmDeleteModalProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

export type ActionsDropDownProps = {
  onEdit: (e: Event) => void;
  onOpenDeleteDialog: (e: Event) => void;
  openDropdown: boolean;
  setOpenDropdown: (open: boolean) => void;
};
