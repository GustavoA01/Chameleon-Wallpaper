import { FolderCard } from '../components/FolderCard';
import { FolderHeader } from './FolderHeader';
import { getAllFolders } from '@/src/actions/folder/getAllFolders';

export const ImagesContent = async () => {
  const folders = await getAllFolders();

  return (
    <main>
      <FolderHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {folders.length > 0 ? (
          folders.map((folder) => <FolderCard key={folder.id} {...folder} />)
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Nenhuma pasta encontrada
          </p>
        )}
      </div>
    </main>
  );
};
