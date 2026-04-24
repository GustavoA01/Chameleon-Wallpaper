import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

export const ImageHeader = () => (
  <DialogHeader>
    <DialogTitle>Adicionar nova imagem</DialogTitle>
    <DialogDescription>
      Escolha uma imagem para salvar na pasta
    </DialogDescription>
  </DialogHeader>
);
