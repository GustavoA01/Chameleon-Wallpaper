import { getAllDevices } from '../actions/devices/getAllDevices';
import { getAllFolders } from '../actions/folder/getAllFolders';
import { HomeTabs } from '../components/HomeTabs';
import { DevicesContent } from '../features/DevicesContent/container';
import { ImagesContent } from '../features/ImagesContent/container';

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string | undefined }>;
}) => {
  const { tab } = await searchParams;
  const selectTab = tab || 'images';
  const folders = await getAllFolders();
  const devices = await getAllDevices();

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeTabs />
      {selectTab === 'images' ? (
        <ImagesContent folders={folders} />
      ) : (
        <DevicesContent folders={folders} devices={devices} />
      )}
    </div>
  );
};

export default Home;
