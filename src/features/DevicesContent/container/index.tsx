import { DeviceType, FolderType } from '@/src/data/types';
import { DeviceCard } from './DeviceCard';
import { DevicesHeader } from './DevicesHeader';

type DeviceContentProps = {
  folders: Omit<FolderType, 'images'>[];
  devices: Omit<DeviceType, 'selectedFolder'>[];
  isAuthenticated: boolean;
};

export const DevicesContent = async ({
  folders,
  devices,
  isAuthenticated,
}: DeviceContentProps) => {
  return (
    <main>
      <DevicesHeader folders={folders} isAuthenticated={isAuthenticated} />
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
