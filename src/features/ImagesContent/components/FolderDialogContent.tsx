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

type FolderDialogContentProps = {
  setIsDialogOpen?: (open: boolean) => void;
};

export const FolderDialogContent = ({
  setIsDialogOpen,
}: FolderDialogContentProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Criar pasta</DialogTitle>
      <DialogDescription>
        Adicione uma nova pasta para organizar suas imagens
      </DialogDescription>
    </DialogHeader>
    <FolderForm setIsDialogOpen={setIsDialogOpen} />
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button form="folder-form">Salvar</Button>
    </DialogFooter>
  </DialogContent>
);
