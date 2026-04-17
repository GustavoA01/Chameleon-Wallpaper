import { DeviceFormData, deviceSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDeviceMutation } from './useDeviceMutation';
import { DeviceType } from '@/src/data/types';

export const useDeviceForm = (setIsDialogOpen: (open: boolean) => void) => {
  const { createDeviceFn } = useDeviceMutation(setIsDialogOpen);
  const methods = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
  });

  const handleSaveDevice = (data: DeviceFormData) => {
    const newDevice: Pick<
      DeviceType,
      'name' | 'intervalSeconds' | 'selectedFolderId'
    > = {
      ...data,
      intervalSeconds: Number(data.intervalSeconds),
    };

    createDeviceFn(newDevice);
  };

  return {
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    handleSaveDevice,
  };
};
