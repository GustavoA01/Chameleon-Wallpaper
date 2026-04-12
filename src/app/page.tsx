import { HomeTabs } from "../components/HomeTabs";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string | null }>;
}) => {
  const { tab } = await searchParams;
  console.log(tab);

  return (
    <div className="container mx-auto px-4 py-8">
      <HomeTabs />
      {tab === "images" || null ? (
        <main>Imagens</main>
      ) : (
        <div>Dispositivos</div>
      )}
    </div>
  );
};

export default Home;
