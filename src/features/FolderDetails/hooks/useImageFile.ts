import { useEffect, useState } from 'react';

export const useImageFile = () => {
  const [choosedFile, setChoosedFile] = useState<string | undefined>(undefined);
  const [chooseImageError, setChooseImageError] = useState<string | null>(null);
  const [urlImage, setUrlImage] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (choosedFile) URL.revokeObjectURL(choosedFile);
    };
  }, [choosedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUrlImage(file);
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

  const formatImage = async (): Promise<{ url: string; publicId: string }> => {
    try {
      if (!choosedFile || !urlImage)
        throw new Error('Nenhum arquivo escolhido para upload');

      const formData = new FormData();
      const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      formData.append('file', urlImage);
      formData.append('upload_preset', 'chameleon');

      const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Erro do Cloudinary:', errorDetails);
        throw new Error('Falha no upload');
      }

      const data = await response.json();
      return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
      console.error('Erro ao formatar a imagem:', error);
      throw error;
    }
  };

  return {
    choosedFile,
    chooseImageError,
    handleFileChange,
    handleImageError,
    setChooseImageError,
    formatImage,
  };
};
