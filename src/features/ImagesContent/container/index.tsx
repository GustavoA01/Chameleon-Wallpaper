import { FolderType } from '@/src/data/types';
import { FolderCard } from '../components/FolderCard';
import { FolderHeader } from './FolderHeader';

export const ImagesContent = async ({
  folders,
}: {
  folders: Omit<FolderType, 'images'>[];
}) => (
  <main>
    <FolderHeader />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {folders.length > 0 ? (
        folders.map((folder) => <FolderCard key={folder.id} {...folder} />)
      ) : (
        <p className="text-center text-muted-foreground mt-4">
          Nenhuma pasta encontrada
        </p>
      )}
    </div>
  </main>
);
