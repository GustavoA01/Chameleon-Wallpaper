import { BackButton } from '@/src/components/BackButton';
import { ImageDialog } from './ImageDialog';

export const DetailsHeader = ({ title }: { title: string }) => (
  <header className="flex justify-between items-center mb-8">
    <BackButton />
    <h1 className="font-montserrat font-semibold text-lg">{title}</h1>
    <ImageDialog />
  </header>
);
