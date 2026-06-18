import { Skeleton } from '../ui/skeleton';

export const ContentHeaderSkeleton = () => (
  <div className="flex items-center justify-between gap-4">
    <Skeleton className="h-5 w-2/3 max-w-xl" />
    <Skeleton className="h-9 w-10 sm:w-40" />
  </div>
);
