'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImage(imageId: string, publicId: string) {
  try {
    const user = await requireUser();
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
        folder: { userId: user.id },
      },
    });

    if (!image || image.publicId !== publicId) {
      throw new Error('Imagem não encontrada');
    }

    const deletedImage = await prisma.image.delete({
      where: { id: imageId },
    });

    await cloudinary.uploader.destroy(publicId);
    revalidatePath('/folder/[id]', 'page');

    return deletedImage;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return { error: 'Falha ao remover a imagem' };
  }
}
