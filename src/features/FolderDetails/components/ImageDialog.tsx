'use client';
import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Plus } from 'lucide-react';
import { ImageForm } from '../container/ImageForm';

export const ImageDialog = ({ folderId }: { folderId: string }) => (
  <>
    <DialogTrigger asChild>
      <Button>
        <Plus />
        <span className="hidden sm:flex">Adicionar imagem</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar nova imagem</DialogTitle>
        <DialogDescription>
          Escolha uma imagem para salvar na pasta
        </DialogDescription>
      </DialogHeader>
      <ImageForm folderId={folderId} />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button form="image-form">Salvar</Button>
      </DialogFooter>
    </DialogContent>
  </>
);
