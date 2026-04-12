import { HomeTabs } from "../components/HomeTabs";
import { ImagesContent } from "../features/ImagesContent/container";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string | null }>;
}) => {
  const { tab } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeTabs />
      {tab === "images" || null ? <ImagesContent /> : <div>Dispositivos</div>}
    </div>
  );
};

export default Home;
