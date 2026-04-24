import { DeviceType, FolderType } from '@/src/data/types';

export type DeviceContentProps = {
  folders: Omit<FolderType, 'images'>[];
  devices: DeviceType[];
};

export type DeviceHeaderProps = {
  folders: Omit<FolderType, 'images'>[];
};

export type DevicesActionsProps = {
  id: string;
  folders: Omit<FolderType, 'images'>[];
};

export type DeviceFormProps = {
  id?: string;
  folders: Omit<FolderType, 'images'>[];
  setIsDialogOpen: (open: boolean) => void;
};

export type TimeSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export type FolderSelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  folders: Pick<FolderType, 'id' | 'name'>[];
};

export type DevicesDialogContentProps = {
  id?: string;
  folders: Omit<FolderType, 'images'>[];
  setIsDialogOpen: (open: boolean) => void;
};

export type DeviceCardProps = Omit<
  DeviceType,
  'selectedFolderId' | 'selectedTime'
> & {
  folders: Omit<FolderType, 'images'>[];
};
