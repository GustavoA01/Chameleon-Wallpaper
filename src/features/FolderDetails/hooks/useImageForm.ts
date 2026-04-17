import { ImageFormData, imageSchema } from '@/src/data/schemas';
import { useImageFile } from './useImageFile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createImage } from '@/src/actions/images/createImage';
import { toast } from 'sonner';

export const useImageForm = (folderId: string) => {
  const {
    chooseImageError,
    setChooseImageError,
    choosedFile,
    handleFileChange,
    handleImageError,
    formatImage,
  } = useImageFile();
  const methods = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
  });

  const { mutateAsync: createImageFn } = useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      toast.success('Imagem criada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar imagem:', error);
      toast.error('Erro ao criar imagem');
    },
  });

  const handleSaveImage = async (data: ImageFormData) => {
    if (!choosedFile || !chooseImageError) {
      setChooseImageError('Nenhum arquivo escolhido para upload');
      return;
    }
    const url = await formatImage();

    const newImage = {
      title: data.title,
      url,
      folderId,
    };
    console.log('chegot');
    await createImageFn(newImage);
  };

  return {
    register: methods.register,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
    chooseImageError,
    choosedFile,
    handleFileChange,
    handleImageError,
    handleSaveImage,
  };
};
