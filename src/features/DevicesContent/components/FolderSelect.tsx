import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { FolderType } from '@/src/data/types';
import { Folder } from 'lucide-react';

type FolderSelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  folders: Pick<FolderType, 'id' | 'name'>[];
};

export const FolderSelect = ({
  value,
  onValueChange,
  folders,
}: FolderSelectProps) => (
  <Select value={value} onValueChange={onValueChange}>
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
