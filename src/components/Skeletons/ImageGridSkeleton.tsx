import { Skeleton } from '../ui/skeleton';

export const ImageGridSkeleton = () => (
  <main aria-label="Carregando imagens">
    <div className="mb-8 flex items-center justify-between gap-4">
      <Skeleton className="size-9" />
      <Skeleton className="h-5 w-40" />
      <Skeleton className="size-9" />
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="relative aspect-video overflow-hidden rounded-md"
          key={index}
        >
          <Skeleton className="absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="size-8" />
          </div>
        </div>
      ))}
    </div>
  </main>
);
