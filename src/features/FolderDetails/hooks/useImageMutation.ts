import { createImage } from '@/src/actions/images/createImage';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const useImageMutation = () => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createImageFn, isPending: isCreatingImage } =
    useMutation({
      mutationFn: createImage,
      onSuccess: () => {
        setOpen(false);
        toast.success('Imagem criada com sucesso!');
      },
      onError: (error) => {
        console.error('Erro ao criar imagem:', error);
        toast.error('Erro ao criar imagem');
      },
    });

  return { createImageFn, open, setOpen, isCreatingImage };
};
