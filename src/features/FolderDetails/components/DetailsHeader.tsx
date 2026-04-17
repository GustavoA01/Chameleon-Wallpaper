import { BackButton } from '@/src/components/BackButton';
import { ImageDialog } from './ImageDialog';
import { Dialog } from '@/src/components/ui/dialog';

type DetailsHeaderProps = {
  folderId: string;
  title: string;
};

export const DetailsHeader = ({ folderId, title }: DetailsHeaderProps) => (
  <header className="flex justify-between items-center mb-8">
    <BackButton />
    <h1 className="font-montserrat font-semibold text-lg">{title}</h1>
    <Dialog>
      <ImageDialog folderId={folderId} />
    </Dialog>
  </header>
);
