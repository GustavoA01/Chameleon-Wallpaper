'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedFolder } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export const deleteFolder = async (id: string) => {
  const user = await requireUser();
  await requireOwnedFolder(user.id, id);

  const deletedFolder = await prisma.folder.delete({ where: { id } });
  revalidatePath('/', 'page');

  return deletedFolder;
};
