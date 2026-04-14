import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { FolderForm } from '../container/FolderForm';

export const FolderDialogContent = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Criar pasta</DialogTitle>
      <DialogDescription>
        Adicione uma nova pasta para organizar suas imagens
      </DialogDescription>
    </DialogHeader>
    <FolderForm />
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button form="folder-form">Salvar</Button>
    </DialogFooter>
  </DialogContent>
);
