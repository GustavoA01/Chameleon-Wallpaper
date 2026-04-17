import { DeviceCard } from '../components/DeviceCard';
import { DevicesHeader } from './DevicesHeader';
import { DeviceType, FolderType } from '@/src/data/types';

type DeviceContentProps = {
  folders: Omit<FolderType, 'images'>[];
  devices: DeviceType[];
};

export const DevicesContent = async ({
  folders,
  devices,
}: DeviceContentProps) => {
  return (
    <main>
      <DevicesHeader folders={folders} />
      {devices?.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">
          Nenhum dispositivo encontrado
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {devices.map((device) => (
            <DeviceCard key={device.id} {...device} folders={folders ?? []} />
          ))}
        </div>
      )}
    </main>
  );
};
