import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { ContentHeaderSkeleton } from './ContentHeaderSkeleton';

export const FolderGridSkeleton = () => (
  <main aria-label="Carregando pastas">
    <ContentHeaderSkeleton />
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card aria-hidden="true" key={index}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton className="size-9" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48 max-w-full" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  </main>
);
