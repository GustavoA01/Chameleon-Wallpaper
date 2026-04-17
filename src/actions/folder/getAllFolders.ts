'use server';
import { FolderType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getAllFolders = async (): Promise<
  Omit<FolderType, 'images'>[]
> => {
  const response = await prisma.folder.findMany({
    include: {
      _count: {
        select: { images: true },
      },
    },
  });

  const folders = response.map((folder) => ({
    id: folder.id,
    name: folder.name,
    description: folder.description,
    imageCount: folder._count.images,
    createdAt: folder.createdAt,
  }));

  return folders;
};
