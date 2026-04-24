import { DeviceType, FolderType } from '@/src/data/types';

export type NewDeviceType = Pick<
  DeviceType,
  'name' | 'intervalSeconds' | 'selectedFolderId'
>;

type FolderDeviceType = Omit<FolderType, 'images'>;

export type DeviceContentProps = {
  folders: FolderDeviceType[];
  devices: DeviceType[];
};

export type DeviceHeaderProps = {
  folders: FolderDeviceType[];
};

export type DevicesActionsProps = {
  id: string;
  folders: FolderDeviceType[];
};

export type DeviceFormProps = {
  id?: string;
  folders: FolderDeviceType[];
  setIsDialogOpen: (open: boolean) => void;
};

export type TimeSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export type FolderSelectProps = {
  value: string;
  onValueChange?: (value: string) => void;
  folders: Pick<FolderType, 'id' | 'name'>[];
  disabled?: boolean;
};

export type DevicesDialogContentProps = {
  id?: string;
  folders: FolderDeviceType[];
  setIsDialogOpen: (open: boolean) => void;
};

export type DeviceCardProps = Omit<DeviceType, 'selectedTime'> & {
  folders: FolderDeviceType[];
};
