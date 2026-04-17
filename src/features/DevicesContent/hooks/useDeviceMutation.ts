import { createDevice } from '@/src/actions/devices/createDevice';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeviceMutation = (setIsDialogOpen: (open: boolean) => void) => {
  const { mutateAsync: createDeviceFn } = useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      setIsDialogOpen(false);
      toast.success('Dispositivo criado');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao criar dispositivo');
    },
  });

  return {
    createDeviceFn,
  };
};
