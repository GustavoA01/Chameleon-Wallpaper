'use server';

import { FolderFormData } from '../data/schemas';
import { prisma } from '../lib/prisma';

export const createFolder = async (formData: FolderFormData) => {
  const newFolder = await prisma.folder.create({
    data: {
      ...formData,
    },
    include: { images: true },
  });

  return newFolder;
};
