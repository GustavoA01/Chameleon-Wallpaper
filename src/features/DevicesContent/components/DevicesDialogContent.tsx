import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

export const DevicesDialogContent = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Adicionar dispositivo</DialogTitle>
      <DialogDescription>
        Adicione um novo dispositivo para vincular a seus papéis de parede
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button form="devices-form">Salvar</Button>
    </DialogFooter>
  </DialogContent>
);
