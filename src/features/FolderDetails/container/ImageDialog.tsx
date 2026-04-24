'use client';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useImageForm } from '../hooks/useImageForm';
import { LabelInput } from '@/src/components/LabelInput';
import { ImageFormData } from '@/src/data/schemas';
import { FileInput } from '../components/FileInput';
import { ImageHeader } from '../components/ImageHeader';

export const ImageDialog = ({ folderId }: { folderId: string }) => {
  const {
    chooseImageError,
    choosedFile,
    errors,
    handleFileChange,
    handleImageError,
    handleSaveImage,
    handleSubmit,
    register,
    open,
    setOpen,
    isCreatingImage,
  } = useImageForm(folderId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="hidden sm:flex">Adicionar imagem</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ImageHeader />
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button form="image-form" disabled={isCreatingImage}>
            {isCreatingImage ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
