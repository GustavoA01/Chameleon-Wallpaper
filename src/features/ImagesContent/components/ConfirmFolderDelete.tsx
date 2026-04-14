import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

type ConfirmFolderDeleteProps = {
  folderName: string;
  onDelete: () => void;
};

export const ConfirmFolderDelete = ({
  folderName,
  onDelete,
}: ConfirmFolderDeleteProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir pasta</DialogTitle>
      <DialogDescription>
        Você está prestes a excluir a pasta{' '}
        <span className="text-foreground font-semibold">{folderName}</span>.
        Esta ação removerá as imagens dentro da pasta também
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button onClick={onDelete} variant="destructive">
        Excluir
      </Button>
    </DialogFooter>
  </DialogContent>
);
