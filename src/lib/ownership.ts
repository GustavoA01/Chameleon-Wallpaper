import 'server-only';
import { prisma } from '@/src/lib/prisma';

export const requireOwnedFolder = async (userId: string, folderId: string) => {
  const folder = await prisma.folder.findFirst({
    where: { id: folderId, userId },
  });

  if (!folder) throw new Error('Pasta não encontrada');

  return folder;
};

export const requireOwnedDevice = async (userId: string, deviceId: string) => {
  const device = await prisma.device.findFirst({
    where: { id: deviceId, userId },
  });

  if (!device) throw new Error('Dispositivo não encontrado');

  return device;
};
