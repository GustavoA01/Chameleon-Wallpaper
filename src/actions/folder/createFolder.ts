'use server';

import { revalidatePath } from 'next/cache';
import { FolderFormData } from '../../data/schemas';
import { prisma } from '../../lib/prisma';
import { requireUser } from '@/src/lib/auth';

export const createFolder = async (formData: FolderFormData) => {
  const user = await requireUser();
  const newFolder = await prisma.folder.create({
    data: {
      ...formData,
      userId: user.id,
    },
    include: { images: true },
  });

  revalidatePath('/', 'page');
  return newFolder;
};
