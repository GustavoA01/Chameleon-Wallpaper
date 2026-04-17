'use server';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteFolder = async (folderId: string) => {
  const deletedFolder = await prisma.folder.delete({
    where: { id: folderId },
  });
  revalidatePath('/');

  return deletedFolder;
};
