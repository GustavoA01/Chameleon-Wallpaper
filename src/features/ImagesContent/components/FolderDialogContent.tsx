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
  id?: string;
  setIsDialogOpen?: (open: boolean) => void;
};

export const FolderDialogContent = ({
  id,
  setIsDialogOpen,
}: FolderDialogContentProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{id ? 'Editar' : 'Criar'} pasta</DialogTitle>
      <DialogDescription>
        Adicione uma nova pasta para organizar suas imagens
      </DialogDescription>
    </DialogHeader>
    <FolderForm id={id} setIsDialogOpen={setIsDialogOpen} />
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button form="folder-form" type="submit">
        Salvar
      </Button>
    </DialogFooter>
  </DialogContent>
);
