import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";

export const ImagesHeader = () => (
  <header className="flex justify-between items-center">
    <h2 className="text-muted-foreground">
      Organize seus papéis de parede em pastas para vinculá-los a seus
      computadores
    </h2>
    <Button>
      <Plus />
      <p className="hidden sm:flex">Criar pasta</p>
    </Button>
  </header>
);
