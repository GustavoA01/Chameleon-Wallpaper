import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { TabHeaderProps } from '../data/types/components';

export const TabHeader = ({
  description,
  buttonText,
  onClick,
}: TabHeaderProps) => (
  <header className="flex justify-between items-center gap-4">
    <h2 className="text-muted-foreground">{description}</h2>
    <Button onClick={onClick}>
      <Plus />
      <p className="hidden sm:flex">{buttonText}</p>
    </Button>
  </header>
);
