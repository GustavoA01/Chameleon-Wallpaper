'use server';
import { ImageType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getImagesByFolder = async (
  folderId: string
): Promise<ImageType[]> => {
  const images = await prisma.image.findMany({
    where: {
      folderId,
    },
  });

  return images;
};
