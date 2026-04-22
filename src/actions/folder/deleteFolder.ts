'use server';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteFolder = async (id: string) => {
  const deletedFolder = await prisma.folder.delete({
    where: { id },
  });
  revalidatePath('/', 'page');

  return deletedFolder;
};
