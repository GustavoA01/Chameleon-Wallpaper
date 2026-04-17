'use server';
import { DeviceFormData } from '@/src/data/schemas';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateDevice = async (
  id: string,
  data: Omit<DeviceFormData, 'intervalSeconds'>
) => {
  const updatedDevice = await prisma.device.update({
    where: { id },
    data: {
      ...data,
    },
  });
  revalidatePath('/');

  return updatedDevice;
};
