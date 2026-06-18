import { DeviceCardSkeleton } from '@/src/features/DevicesContent/components/DeviceCardSkeleton';
import { ContentHeaderSkeleton } from './ContentHeaderSkeleton';

export const DeviceGridSkeleton = () => (
  <main aria-label="Carregando dispositivos">
    <ContentHeaderSkeleton />
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <DeviceCardSkeleton key={index} />
      ))}
    </div>
  </main>
);
