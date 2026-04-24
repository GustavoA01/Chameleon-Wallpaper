'use client';
import Image from 'next/image';
import { ImageType } from '../data/types';
import { deleteImage } from '../actions/images/deleteImage';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

export const ImageCard = ({ id, title, url, publicId }: ImageType) => (
  <div
    onClick={() => {}}
    className="group cursor-pointer h-auto overflow-hidden rounded-md relative border border-bg-transparent hover:border-primary transition-all duration-200"
  >
    <Image
      src={url}
      alt={title}
      width={400}
      height={300}
      loading="eager"
      className="aspect-video group-hover:scale-110 object-cover w-full transition-all duration-400 rounded-md"
    />
    <div className="sm:translate-y-15 group-hover:translate-y-0 transition-all duration-400 absolute bottom-0 flex justify-between items-center w-full backdrop-blur-lg overflow-hidden px-4 py-2 rounded-b-md">
      <h2 className="font-bold line-clamp-1 text-white">{title}</h2>
      <Button
        size="icon"
        variant="destructive"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          deleteImage(id, publicId);
        }}
      >
        <Trash className="text-destructive" size={14} />
      </Button>
    </div>
  </div>
);
