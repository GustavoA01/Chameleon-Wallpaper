'use client';
import { LabelInput } from '@/src/components/LabelInput';
import { ImageFormData } from '@/src/data/schemas';
import { useImageForm } from '../hooks/useImageForm';
import { FileInput } from '../components/FileInput';

export const ImageForm = () => {
  const {
    chooseImageError,
    choosedFile,
    errors,
    handleFileChange,
    handleImageError,
    handleSaveImage,
    handleSubmit,
    register,
  } = useImageForm();

  return (
    <form id="image-form" onSubmit={handleSubmit(handleSaveImage)}>
      <LabelInput<ImageFormData>
        name="title"
        label="Título"
        placeholder="Ex: pôr do sol"
        register={register}
        errors={errors}
      />
      <FileInput
        choosedFile={choosedFile}
        chooseImageError={chooseImageError}
        handleFileChange={handleFileChange}
        handleImageError={handleImageError}
      />
    </form>
  );
};
