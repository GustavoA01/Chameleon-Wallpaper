import { FolderCard } from '../components/FolderCard';
import { FolderHeader } from './FolderHeader';

export const ImagesContent = () => {
  return (
    <main className="">
      <FolderHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[...Array(6)].map((_, index) => (
          <FolderCard key={index} id={index + 1} />
        ))}
      </div>
    </main>
  );
};
