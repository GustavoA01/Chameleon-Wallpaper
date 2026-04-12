import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Folder } from "lucide-react";
import Link from "next/link";

export const FolderCard = () => (
  <Link href="#">
    <Card className="group hover:border-primary cursor-pointer border border-transparent transition-all duration-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10">
            <Folder size={15} />
          </div>

          <div>
            <CardTitle className="font-montserrat line-clamp-1 group-hover:text-primary transition-all duration-200">
              <h1>Natureza</h1>
            </CardTitle>

            <p className="text-muted-foreground text-sm line-clamp-1">
              Imagens da natureza
            </p>
          </div>
        </div>

        <CardAction>
          <Badge variant="outline" className="text-muted-foreground rounded-md">
            12 Imagens
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  </Link>
);
