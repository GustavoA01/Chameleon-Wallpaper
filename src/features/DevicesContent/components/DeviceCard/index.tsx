import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { FolderSelect } from './FolderSelect';
import { Button } from '@/src/components/ui/button';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import { TimeSelect } from './TimeSelect';
import { Switch } from '@/src/components/ui/switch';

export const DeviceCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Computador 1</CardTitle>
      <CardAction className="flex items-center space-x-2">
        <Switch />
      </CardAction>
    </CardHeader>

    <CardFooter className="space-x-2">
      <FolderSelect />
      <TimeSelect />
      <div className="ml-auto space-x-1">
        <Button title="Imagem anterior">
          <ChevronFirst />
        </Button>
        <Button title="Imagem seguinte">
          <ChevronLast />
        </Button>
      </div>
    </CardFooter>
  </Card>
);
