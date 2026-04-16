export interface FolderType {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  images: ImageType[];
}

export interface ImageType {
  id: string;
  title: string;
  url: string;
  folderId: FolderType['id'];
}

export interface DeviceType {
  id: string;
  name: string;
  isActive: boolean;
  selectedTime: number;
  selectedFolderId: FolderType['id'];
}
