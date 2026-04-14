import { DetailsHeader } from '@/src/features/FolderDetails/components/DetailsHeader';

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <DetailsHeader />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
        <div></div>
      </main>
    </div>
  );
};

export default FolderPage;
