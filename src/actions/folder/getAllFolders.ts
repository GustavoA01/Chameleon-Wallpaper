'use server';

import { FolderType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/auth';

export const getAllFolders = async (): Promise<
  Omit<FolderType, 'images'>[]
> => {
  const user = await getCurrentUser();
  const response = await prisma.folder.findMany({
    where: { userId: user?.id ?? null },
    include: {
      _count: {
        select: { images: true },
      },
    },
  });

  return response.map((folder) => ({
    id: folder.id,
    name: folder.name,
    description: folder.description,
    imageCount: folder._count.images,
    createdAt: folder.createdAt,
  }));
};
