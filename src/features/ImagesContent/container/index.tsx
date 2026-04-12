import { FolderCard } from "../components/FolderCard";
import { ImagesHeader } from "../components/ImagesHeader";

export const ImagesContent = () => {
  return (
    <main className="">
      <ImagesHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[...Array(6)].map((_, index) => (
          <FolderCard key={index} />
        ))}
      </div>
    </main>
  );
};
