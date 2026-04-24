import { ImageFormData, imageSchema } from '@/src/data/schemas';
import { useImageFile } from './useImageFile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useImageMutation } from './useImageMutation';

export const useImageForm = (folderId: string) => {
  const { createImageFn, open, setOpen, isCreatingImage } = useImageMutation();
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

  const handleSaveImage = async (data: ImageFormData) => {
    if (!choosedFile || !chooseImageError) {
      setChooseImageError('Nenhum arquivo escolhido para upload');
      return;
    }
    const { url, publicId } = await formatImage();

    const newImage = {
      title: data.title,
      url,
      publicId,
      folderId,
    };

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
    open,
    setOpen,
    isCreatingImage,
  };
};
