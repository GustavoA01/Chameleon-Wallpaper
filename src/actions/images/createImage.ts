'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedFolder } from '@/src/lib/ownership';

type CreateImageParamsType = {
  title: string;
  url: string;
  publicId: string;
  folderId: string;
};

export const createImage = async (formData: CreateImageParamsType) => {
  const user = await requireUser();
  await requireOwnedFolder(user.id, formData.folderId);

  const newImage = await prisma.image.create({ data: formData });
  revalidatePath('/folder/[id]', 'page');

  return newImage;
};
