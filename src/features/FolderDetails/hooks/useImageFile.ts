import { useEffect, useState } from 'react';

export const useImageFile = () => {
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

  return {
    choosedFile,
    chooseImageError,
    handleFileChange,
    handleImageError,
  };
};
