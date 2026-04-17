import { Badge } from '@/src/components/ui/badge';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import { FolderActions } from '../container/FolderActions';
import { FolderType } from '@/src/data/types';
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

type FolderCardProps = Omit<FolderType, 'images'>;

export const FolderCard = ({
  id,
  name,
  description,
  imageCount,
}: FolderCardProps) => (
  <Link href={`/folder/${id}`}>
    <Card className="group hover:border-primary cursor-pointer border border-transparent transition-all duration-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10">
            <Folder size={20} />
          </div>

          <div>
            <CardTitle className="font-montserrat line-clamp-1 group-hover:text-primary transition-all duration-200">
              <h1>{name}</h1>
            </CardTitle>

            <p className="text-muted-foreground text-sm line-clamp-1">
              {description}
            </p>
          </div>
        </div>

        <CardAction className="flex items-center gap-2">
          <Badge variant="outline" className="text-muted-foreground rounded-md">
            {imageCount === 0
              ? 'Nenhuma Imagem'
              : imageCount === 1
                ? `${imageCount} Imagem`
                : `${imageCount} Imagens`}
          </Badge>
          <FolderActions id={id} />
        </CardAction>
      </CardHeader>
    </Card>
  </Link>
);
