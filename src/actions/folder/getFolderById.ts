'use server';
import { FolderType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getFolderById = async (id: string): Promise<FolderType | null> => {
  const response = await prisma.folder.findUnique({
    where: { id },
    include: {
      images: true,
      _count: {
        select: { images: true },
      },
    },
  });

  if (!response) return null;

  const folder = {
    id: response.id,
    name: response.name,
    description: response.description,
    images: response.images,
    imageCount: response._count.images,
    createdAt: response.createdAt,
  };

  return folder;
};
