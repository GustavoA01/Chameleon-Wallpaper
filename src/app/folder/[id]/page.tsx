import { getFolderById } from '@/src/actions/folder/getFolderById';
import { DetailsHeader } from '@/src/features/FolderDetails/components/DetailsHeader';
import ErrorPage from './error';
import { getImagesByFolder } from '@/src/actions/images/getImagesByFolder';
import { ImageCard } from '@/src/components/ImageCard';

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const folder = await getFolderById(id);

  if (!folder) return ErrorPage({ error: new Error('Pasta não encontrada') });

  const images = await getImagesByFolder(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <DetailsHeader folderId={folder.id} title={folder.name} />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {images.length === 0 ? (
          <p className="text-center text-muted-foreground mt-8">
            Nenhuma imagem encontrada
          </p>
        ) : (
          <>
            {images.map((image) => (
              <ImageCard key={image.id} {...image} />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default FolderPage;
