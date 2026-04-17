import { ImageFormData, imageSchema } from '@/src/data/schemas';
import { useImageFile } from './useImageFile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useImageForm = (folderId: string) => {
  const { chooseImageError, choosedFile, handleFileChange, handleImageError } =
    useImageFile();
  const methods = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
  });

  const handleSaveImage = (data: ImageFormData) => {
    const newImage = {
      title: data.title,
      url: choosedFile,
      folderId,
    };
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
