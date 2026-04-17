'use server';
import { FolderFormData } from '@/src/data/schemas';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateFolder = async (id: string, data: FolderFormData) => {
  const updatedFolder = await prisma.folder.update({
    where: { id },
    data: {
      ...data,
    },
  });
  revalidatePath('/');

  return updatedFolder;
};
