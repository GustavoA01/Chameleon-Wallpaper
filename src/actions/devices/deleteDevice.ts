'use server';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteDevice = async (deviceId: string) => {
  const deletedDevice = await prisma.device.delete({
    where: { id: deviceId },
  });
  revalidatePath('/');

  return deletedDevice;
};
