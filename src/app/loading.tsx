import { Skeleton } from '@/src/components/ui/skeleton';
import { FolderGridSkeleton } from '../components/Skeletons';

const HomeLoading = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8 flex items-center gap-2">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-28" />
    </div>
    <FolderGridSkeleton />
  </div>
);

export default HomeLoading;
