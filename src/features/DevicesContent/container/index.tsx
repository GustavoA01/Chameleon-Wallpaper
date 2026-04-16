import { DeviceCard } from '../components/DeviceCard';
import { DevicesHeader } from './DevicesHeader';

export const DevicesContent = () => {
  return (
    <main>
      <DevicesHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <DeviceCard isActive name="Computador 1" />
      </div>
    </main>
  );
};
