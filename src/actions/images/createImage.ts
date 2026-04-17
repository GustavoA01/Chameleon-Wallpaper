'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';

type CreateImageParamsType = {
  title: string;
  url: string;
  folderId: string;
};

export const createImage = async (formData: CreateImageParamsType) => {
  const newImage = await prisma.image.create({
    data: {
      ...formData,
    },
  });
  revalidatePath('/folder/[id]');

  return newImage;
};
