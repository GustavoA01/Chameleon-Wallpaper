'use client';
import { LabelInput } from '@/src/components/LabelInput';
import { Input } from '@/src/components/ui/input';
import { ImageFormData, imageSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
  });
  const [choosedFile, setChoosedFile] = useState<string | undefined>(undefined);
  const [chooseImageError, setChooseImageError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (choosedFile) URL.revokeObjectURL(choosedFile);
    };
  }, [choosedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setChoosedFile(fileURL);
    }
  };

  const handleImageError = () => {
    setChooseImageError('Erro ao carregar a imagem');
    setChoosedFile(undefined);
    setTimeout(() => {
      setChooseImageError(null);
    }, 5000);
  };

  const handleSaveImage = (data: ImageFormData) => {
    console.log(data);
  };

  return (
    <form id="image-form" onSubmit={handleSubmit(handleSaveImage)}>
      <LabelInput<ImageFormData>
        name="title"
        label="Título"
        placeholder="Ex: pôr do sol"
        register={register}
        errors={errors}
      />
      <label
        htmlFor="select-image"
        className="flex items-center justify-center border rounded-xl bg-card p-4 h-auto cursor-pointer"
      >
        <Input
          id="select-image"
          type="file"
          className="hidden"
          {...register('file')}
          onChange={handleFileChange}
        />
        {choosedFile && (
          <Image
            src={choosedFile!}
            alt="Preview"
            width={200}
            height={300}
            onError={handleImageError}
            className="rounded-md"
          />
        )}

        <div className="flex flex-col items-center justify-center gap-2">
          <ImageUp size={18} className="cursor-pointer text-muted-foreground" />
          {chooseImageError && (
            <p className="text-sm text-destructive">{chooseImageError}</p>
          )}
        </div>
      </label>
    </form>
  );
};
