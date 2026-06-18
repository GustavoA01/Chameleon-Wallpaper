'use server';

import { FolderType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/auth';

export const getFolderById = async (id: string): Promise<FolderType | null> => {
  const user = await getCurrentUser();
  const response = await prisma.folder.findFirst({
    where: { id, userId: user?.id ?? null },
    include: {
      images: true,
      _count: {
        select: { images: true },
      },
    },
  });

  if (!response) return null;

  return {
    id: response.id,
    name: response.name,
    description: response.description,
    images: response.images,
    imageCount: response._count.images,
    createdAt: response.createdAt,
  };
};
