import { BackButton } from '@/src/components/BackButton';
import { ImageDialog } from '../container/ImageDialog';
import { DetailsHeaderProps } from '../types';

export const DetailsHeader = ({ folderId, title }: DetailsHeaderProps) => (
  <header className="flex justify-between items-center mb-8">
    <BackButton />
    <h1 className="font-montserrat font-semibold text-lg">{title}</h1>
    <ImageDialog folderId={folderId} />
  </header>
);
