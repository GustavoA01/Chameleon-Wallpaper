'use client';
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
import { useState } from 'react';
import { DevicesActions } from '../container/DevicesActions';
import { DeviceCardProps } from '../types';

export const DeviceCard = ({
  id,
  name,
  isActive,
  folders,
}: DeviceCardProps) => {
  const [time, setTime] = useState('900');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction className="flex items-center space-x-2">
          <Switch defaultChecked={isActive} />
          <DevicesActions id={id} folders={folders} />
        </CardAction>
      </CardHeader>

      <CardFooter className="space-x-2">
        <FolderSelect folders={folders} />
        <TimeSelect value={time} onValueChange={setTime} />
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
};
