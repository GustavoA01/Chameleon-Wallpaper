import { updateDeviceSettings } from '@/src/actions/devices/updateDeviceSettings';
import { nextImage } from '@/src/actions/wallpaper/nextImage';
import { startLoop } from '@/src/actions/wallpaper/startLoop';
import { stopLoop } from '@/src/actions/wallpaper/stopLoop';
import { updateInterval } from '@/src/actions/wallpaper/updateInterval';
import { DeviceType } from '@/src/data/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useDeviceChange = (
  id: string,
  intervalSeconds: number,
  selectedFolderId: string,
  isActive: boolean
) => {
  const [time, setTime] = useState(intervalSeconds.toString());
  const [selectedFolder, setSelectedFolder] = useState(selectedFolderId);
  const [active, setActive] = useState(isActive);

  const { mutateAsync: updateDeviceFn, isPending } = useMutation({
    mutationFn: (data: Partial<DeviceType>) =>
      updateDeviceSettings({ id, ...data }),
    onSuccess: async () => {
      toast.success('Altera????o salva');
    },
    onError: () => {
      toast.error('Erro ao salvar altera????o');
      console.error('Error updating device settings');
    },
  });

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  useEffect(() => {
    if (!active) return;

    void startLoop();
  }, [active, id]);

  const onSelectFolder = async (folderId: string) => {
    setSelectedFolder(folderId);
    await updateDeviceFn({ selectedFolderId: folderId });
    await nextImage(folderId);
  };

  const onChangeTime = async (time: string) => {
    setTime(time);
    const intervalSeconds = parseInt(time);
    await updateDeviceFn({ intervalSeconds });
    await updateInterval(intervalSeconds);
  };

  const onActiveChange = async (checked: boolean) => {
    setActive(checked);
    const currentDevice = await updateDeviceFn({ isActive: checked });

    if (currentDevice.isActive) {
      await startLoop();
      return;
    }

    await stopLoop();
  };

  return {
    time,
    active,
    selectedFolder,
    onSelectFolder,
    onChangeTime,
    onActiveChange,
    isPending,
  };
};
