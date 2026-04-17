import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

type ConfirmDeleteModalProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

export const ConfirmDeleteModal = ({
  title,
  description,
  onDelete,
}: ConfirmDeleteModalProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
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
