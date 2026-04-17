import { getAllDevices } from '@/src/actions/devices/getAllDevices';
import { DeviceCard } from '../components/DeviceCard';
import { DevicesHeader } from './DevicesHeader';
import { getAllFolders } from '@/src/actions/folder/getAllFolders';

export const DevicesContent = async () => {
  const devices = await getAllDevices();
  const folders = await getAllFolders();

  return (
    <main>
      <DevicesHeader folders={folders} />
      {devices?.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">
          Nenhum dispositivo adicionado
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
