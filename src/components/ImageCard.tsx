import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { ImageType } from '../data/types';

export const ImageCard = ({ title, url }: ImageType) => (
  <div className="group h-auto overflow-hidden rounded-md relative border border-bg-transparent hover:border-primary transition-all duration-200">
    <Image
      src={url}
      alt={title}
      width={400}
      height={300}
      className="aspect-video group-hover:scale-110 object-cover w-full transition-all duration-400 rounded-md"
    />
    <div className="absolute bottom-0 flex justify-between items-center w-full backdrop-blur-lg overflow-hidden px-4 py-2 rounded-b-md">
      <h2 className="font-bold line-clamp-1 text-white">{title}</h2>
      <Button variant="destructive" size="icon">
        <Trash className="text-destructive" size={14} />
      </Button>
    </div>
  </div>
);
