import { FolderType } from '@/src/data/types';

export type ImagesContentProps = {
  folders: Omit<FolderType, 'images'>[];
};

export type FolderCardProps = Omit<FolderType, 'images' | 'createdAt'>;

export type FolderDialogContentProps = {
  id?: string;
  setIsDialogOpen?: (open: boolean) => void;
};
