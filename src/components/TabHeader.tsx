import { Plus } from 'lucide-react';
import { Button } from './ui/button';

type TabHeaderProps = {
  description: string;
  buttonText: string;
  onClick: () => void;
};

export const TabHeader = ({
  description,
  buttonText,
  onClick,
}: TabHeaderProps) => (
  <header className="flex justify-between items-center">
    <h2 className="text-muted-foreground">{description}</h2>
    <Button onClick={onClick}>
      <Plus />
      <p className="hidden sm:flex">{buttonText}</p>
    </Button>
  </header>
);
