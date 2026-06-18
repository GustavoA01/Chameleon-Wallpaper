import { Suspense } from 'react';
import { getAllDevices } from '../actions/devices/getAllDevices';
import { getAllFolders } from '../actions/folder/getAllFolders';
import {
  DeviceGridSkeleton,
  FolderGridSkeleton,
} from '../components/Skeletons';
import { HomeTabs } from '../components/HomeTabs';
import { DevicesContent } from '../features/DevicesContent/container';
import { ImagesContent } from '../features/ImagesContent/container';
import { getCurrentUser } from '../lib/auth';

type FoldersPromise = ReturnType<typeof getAllFolders>;
type DevicesPromise = ReturnType<typeof getAllDevices>;

const ImagesTabContent = async ({
  foldersPromise,
  isAuthenticated,
}: {
  foldersPromise: FoldersPromise;
  isAuthenticated: boolean;
}) => {
  const folders = await foldersPromise;
  return <ImagesContent folders={folders} isAuthenticated={isAuthenticated} />;
};

const DevicesTabContent = async ({
  foldersPromise,
  devicesPromise,
  isAuthenticated,
}: {
  foldersPromise: FoldersPromise;
  devicesPromise: DevicesPromise;
  isAuthenticated: boolean;
}) => {
  const [folders, devices] = await Promise.all([
    foldersPromise,
    devicesPromise,
  ]);
  return (
    <DevicesContent
      folders={folders}
      devices={devices}
      isAuthenticated={isAuthenticated}
    />
  );
};

const Home = async () => {
  const user = await getCurrentUser();
  const foldersPromise = getAllFolders();
  const devicesPromise = getAllDevices();
  const isAuthenticated = Boolean(user);

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeTabs
        imagesContent={
          <Suspense fallback={<FolderGridSkeleton />}>
            <ImagesTabContent
              foldersPromise={foldersPromise}
              isAuthenticated={isAuthenticated}
            />
          </Suspense>
        }
        devicesContent={
          <Suspense fallback={<DeviceGridSkeleton />}>
            <DevicesTabContent
              foldersPromise={foldersPromise}
              devicesPromise={devicesPromise}
              isAuthenticated={isAuthenticated}
            />
          </Suspense>
        }
      />
    </div>
  );
};

export default Home;
