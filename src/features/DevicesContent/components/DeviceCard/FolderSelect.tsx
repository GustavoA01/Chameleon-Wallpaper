import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Folder } from 'lucide-react';

type FolderSelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
};

export const FolderSelect = ({ value, onValueChange }: FolderSelectProps) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger>
      <SelectValue placeholder={<Folder />} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="pasta1">Pasta 1</SelectItem>
        <SelectItem value="pasta2">Pasta 2</SelectItem>
        <SelectItem value="pasta3">Pasta 3</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
