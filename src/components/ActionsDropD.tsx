import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { ActionsDropDownProps } from '../data/types/components';

export const ActionsDropDown = ({
  onEdit,
  onOpenDeleteDialog,
  openDropdown,
  setOpenDropdown,
}: ActionsDropDownProps) => (
  <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-40">
      <DropdownMenuItem
        onSelect={onEdit}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cursor-pointer"
      >
        <Pencil className="mr-2 h-4 w-4" />
        <span>Editar</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={onOpenDeleteDialog}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cursor-pointer text-destructive"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Excluir</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
