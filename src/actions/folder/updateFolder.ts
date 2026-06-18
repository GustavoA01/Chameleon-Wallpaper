'use server';

import { FolderFormData } from '@/src/data/schemas';
import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedFolder } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export const updateFolder = async (id: string, data: FolderFormData) => {
  const user = await requireUser();
  await requireOwnedFolder(user.id, id);

  const updatedFolder = await prisma.folder.update({
    where: { id },
    data,
  });

  revalidatePath('/', 'page');
  return updatedFolder;
};
