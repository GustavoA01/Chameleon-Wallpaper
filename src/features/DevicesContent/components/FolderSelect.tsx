import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Folder } from 'lucide-react';
import { FolderSelectProps } from '../types';

export const FolderSelect = ({
  value,
  onValueChange,
  folders,
  disabled,
}: FolderSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder={<Folder />} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {folders.length === 0 ? (
          <SelectItem value="none" disabled>
            Nenhuma pasta encontrada
          </SelectItem>
        ) : (
          folders.map((folder) => (
            <SelectItem key={folder.id} value={folder.id}>
              {folder.name}
            </SelectItem>
          ))
        )}
      </SelectGroup>
    </SelectContent>
  </Select>
);
