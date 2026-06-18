import { Suspense } from 'react';
import { getFolderById } from '@/src/actions/folder/getFolderById';
import { DetailsHeader } from '@/src/features/FolderDetails/components/DetailsHeader';
import ErrorPage from './error';
import { getImagesByFolder } from '@/src/actions/images/getImagesByFolder';
import { ImageCard } from '@/src/components/ImageCard';
import { ImageGridSkeleton } from '@/src/components/Skeletons/ImageGridSkeleton';

const FolderContent = async ({ id }: { id: string }) => {
  const folder = await getFolderById(id);

  if (!folder) return ErrorPage({ error: new Error('Pasta não encontrada') });

  const images = await getImagesByFolder(id);

  return (
    <>
      <DetailsHeader folderId={folder.id} title={folder.name} />
      <main className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {images.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">
            Nenhuma imagem encontrada
          </p>
        ) : (
          images.map((image, index) => (
            <ImageCard key={image.id} {...image} delayTime={index * 0.1} />
          ))
        )}
      </main>
    </>
  );
};

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ImageGridSkeleton />} key={id}>
        <FolderContent id={id} />
      </Suspense>
    </div>
  );
};

export default FolderPage;
