import { FolderCard } from '../components/FolderCard';
import { FolderHeader } from './FolderHeader';

export const ImagesContent = () => {
  return (
    <main className="">
      <FolderHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <FolderCard
          id="123"
          name="Vacation Photos"
          description="Descricao"
          imageCount={15}
        />
      </div>
    </main>
  );
};
