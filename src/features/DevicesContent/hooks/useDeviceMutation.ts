import { createDevice } from '@/src/actions/devices/createDevice';
import { deleteDevice } from '@/src/actions/devices/deleteDevice';
import { updateDevice } from '@/src/actions/devices/updateDevice';
import { DeviceFormData } from '@/src/data/schemas';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeviceMutation = (
  setIsDialogOpen?: (open: boolean) => void
) => {
  const { mutateAsync: createDeviceFn } = useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      if (setIsDialogOpen) setIsDialogOpen(false);
      toast.success('Dispositivo criado');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao criar dispositivo');
    },
  });

  const { mutateAsync: updateDeviceFn } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<DeviceFormData, 'intervalSeconds'>;
    }) => updateDevice(id, data),
    onSuccess: () => {
      if (setIsDialogOpen) setIsDialogOpen(false);
      toast.success('Dispositivo atualizado');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao atualizar dispositivo');
    },
  });

  const { mutateAsync: deleteDeviceFn } = useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      if (setIsDialogOpen) setIsDialogOpen(false);
      toast.success('Dispositivo excluído');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao excluir dispositivo');
    },
  });

  return {
    createDeviceFn,
    deleteDeviceFn,
    updateDeviceFn,
  };
};
