export interface FolderType {
  id: string;
  name: string;
  description: string | null;
  images: ImageType[];
  imageCount: number;
  createdAt: Date;
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
  intervalSeconds: number;
  selectedFolderId: FolderType['id'];
}
