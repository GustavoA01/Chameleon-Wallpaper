export interface Folder {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  images: Image[];
}

export interface Image {
  id: string;
  title: string;
  url: string;
  folderId: Folder['id'];
}

export interface Device {
  id: string;
  name: string;
  isActive: boolean;
  selectedTime: number;
  selectedFolderId: Folder['id'];
}
