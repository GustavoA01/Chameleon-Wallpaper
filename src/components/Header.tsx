import Image from 'next/image';

export const Header = () => (
  <header className="bg-primary">
    <div className="container mx-auto flex items-center gap-3 px-4 py-4">
      <Image
        priority
        width={28}
        height={28}
        src="/favicon.jpg"
        alt="Chameleon Wallpaper"
        className="size-7 rounded-sm object-cover"
      />
      <h1 className="text-lg font-montserrat font-bold select-none">
        Chameleon Wallpaper
      </h1>
    </div>
  </header>
);
