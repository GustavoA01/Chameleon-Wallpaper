'use server';
import { prisma } from '@/src/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImage(imageId: string, publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);

    const deletedImage = await prisma.image.delete({
      where: { id: imageId },
    });
    revalidatePath(`/folder/[id]`);

    return deletedImage;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return { error: 'Falha ao remover a imagem' };
  }
}
