'use client';
import Image from 'next/image';
import { deleteImage } from '../actions/images/deleteImage';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { selectImage } from '../actions/wallpaper/selectImage';
import { motion } from 'motion/react';
import { ImageCardProps } from '../data/types/components';

export const ImageCard = ({
  id,
  title,
  url,
  publicId,
  delayTime = 0,
}: ImageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delayTime, ease: 'easeOut' }}
    onClick={() => selectImage(url)}
    className="group relative aspect-video cursor-pointer overflow-hidden rounded-md border border-transparent transition-colors duration-200 hover:border-primary"
  >
    <Image
      src={url}
      alt={title}
      width={400}
      height={300}
      loading="eager"
      className="h-full w-full rounded-md object-cover transition-transform duration-400 group-hover:scale-110"
    />
    <div className="absolute bottom-0 flex w-full translate-y-full items-center justify-between overflow-hidden rounded-b-md border-t border-t-primary/30 bg-black/35 px-4 py-2 backdrop-blur-xs transition-transform duration-300 group-hover:translate-y-0 sm:translate-y-full">
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
  </motion.div>
);
