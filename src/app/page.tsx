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

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeTabs />
      {selectTab === 'images' ? <ImagesContent /> : <DevicesContent />}
    </div>
  );
};

export default Home;
