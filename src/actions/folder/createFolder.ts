'use server';
import { revalidatePath } from 'next/cache';
import { FolderFormData } from '../../data/schemas';
import { prisma } from '../../lib/prisma';

export const createFolder = async (formData: FolderFormData) => {
  const newFolder = await prisma.folder.create({
    data: {
      ...formData,
    },
    include: { images: true },
  });
  revalidatePath('/', 'page');

  return newFolder;
};
