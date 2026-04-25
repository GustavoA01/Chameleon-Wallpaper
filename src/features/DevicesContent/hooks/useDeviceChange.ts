import { updateDeviceSettings } from '@/src/actions/devices/updateDeviceSettings';
import { selectFolder } from '@/src/actions/wallpaper/selectFolder';
import { startLoop } from '@/src/actions/wallpaper/startLoop';
import { DeviceType } from '@/src/data/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDeviceChange = (
  id: string,
  intervalSeconds: number,
  selectedFolderId: string,
  isActive: boolean
) => {
  const [time, setTime] = useState(intervalSeconds.toString());
  const [selectedFolder, setSelectedFolder] = useState(selectedFolderId);

  const { mutateAsync: updateDeviceFn, isPending } = useMutation({
    mutationFn: (data: Partial<DeviceType>) =>
      updateDeviceSettings({ id, ...data }),
    onSuccess: async () => {
      toast.success('Alteração salva');
    },
    onError: () => {
      toast.error('Erro ao salvar alteração');
      console.error('Error updating device settings');
    },
  });

  const onSelectFolder = async (folderId: string) => {
    setSelectedFolder(folderId);
    await updateDeviceFn({ selectedFolderId: folderId });
    await selectFolder(folderId);
  };

  const onChangeTime = async (time: string) => {
    setTime(time);
    await updateDeviceFn({ intervalSeconds: parseInt(time) });
  };

  const onActiveChange = async () => {
    const currentDevice = await updateDeviceFn({ isActive: !isActive });
    if (currentDevice.isActive !== isActive) await startLoop(id);
  };
  return {
    time,
    selectedFolder,
    onSelectFolder,
    onChangeTime,
    onActiveChange,
    isPending,
  };
};
