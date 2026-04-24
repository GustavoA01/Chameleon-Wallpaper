'use client';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { FolderSelect } from '../components/FolderSelect';
import { Button } from '@/src/components/ui/button';
import { ChevronLast } from 'lucide-react';
import { TimeSelect } from '../components/TimeSelect';
import { Switch } from '@/src/components/ui/switch';
import { DevicesActions } from './DevicesActions';
import { DeviceCardProps } from '../types';
import { useDeviceChange } from '../hooks/useDeviceChange';

export const DeviceCard = ({
  id,
  name,
  isActive,
  folders,
  intervalSeconds,
  selectedFolderId,
}: DeviceCardProps) => {
  const {
    time,
    selectedFolder,
    onSelectFolder,
    onChangeTime,
    onActiveChange,
    isPending,
  } = useDeviceChange(id, intervalSeconds, selectedFolderId, isActive);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction className="flex items-center space-x-2">
          <Switch
            disabled={isPending}
            defaultChecked={isActive}
            onCheckedChange={onActiveChange}
          />
          <DevicesActions id={id} folders={folders} />
        </CardAction>
      </CardHeader>

      <CardFooter className="space-x-2">
        <FolderSelect
          folders={folders}
          value={selectedFolder}
          onValueChange={onSelectFolder}
          disabled={isPending}
        />
        <TimeSelect
          value={time}
          onValueChange={onChangeTime}
          disabled={isPending}
        />
        <Button
          className="ml-auto"
          title="Imagem seguinte"
          disabled={isPending}
        >
          <ChevronLast />
        </Button>
      </CardFooter>
    </Card>
  );
};
