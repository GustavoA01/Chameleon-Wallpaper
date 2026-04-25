'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getAllDevices = async (): Promise<
  Omit<DeviceType, 'selectedFolder'>[]
> => {
  const response = await prisma.device.findMany();
  return response;
};
