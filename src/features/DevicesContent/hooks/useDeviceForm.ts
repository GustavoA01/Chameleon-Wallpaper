import { DeviceFormData, deviceSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDeviceMutation } from './useDeviceMutation';
import { useFetchDevice } from './useFetchDevice';
import { NewDeviceType } from '../types';

export const useDeviceForm = (
  id: string | undefined,
  setIsDialogOpen: (open: boolean) => void
) => {
  const methods = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
  });
  useFetchDevice(methods, id);
  const { createDeviceFn, updateDeviceFn } = useDeviceMutation(setIsDialogOpen);

  const handleSaveDevice = async (data: DeviceFormData) => {
    const newDevice: NewDeviceType = {
      ...data,
      intervalSeconds: Number(data.intervalSeconds),
    };

    if (id) await updateDeviceFn({ id, data: newDevice });
    else await createDeviceFn(newDevice);
  };

  return {
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    handleSaveDevice,
  };
};
