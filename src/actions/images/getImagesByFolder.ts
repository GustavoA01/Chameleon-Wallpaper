'use server';

import { ImageType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/auth';
import { requireOwnedFolder } from '@/src/lib/ownership';

export const getImagesByFolder = async (
  folderId: string
): Promise<ImageType[]> => {
  const user = await getCurrentUser();

  if (user) {
    await requireOwnedFolder(user.id, folderId);
  } else {
    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId: null },
    });
    if (!folder) return [];
  }

  return prisma.image.findMany({ where: { folderId } });
};
