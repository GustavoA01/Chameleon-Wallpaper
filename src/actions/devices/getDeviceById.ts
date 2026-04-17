'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getDeviceById = async (id: string): Promise<DeviceType | null> => {
  const device = await prisma.device.findUnique({
    where: { id },
  });

  if (!device) return null;

  return device;
};
