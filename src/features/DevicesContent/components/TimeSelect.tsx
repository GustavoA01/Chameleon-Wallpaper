import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Timer } from 'lucide-react';
import { TimeSelectProps } from '../types';

export const TimeSelect = ({
  value,
  onValueChange,
  disabled,
}: TimeSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder={<Timer />} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="900">15 min</SelectItem>
        <SelectItem value="1800">30 min</SelectItem>
        <SelectItem value="3600">1 h</SelectItem>
        <SelectItem value="10800">3 h</SelectItem>
        <SelectItem value="21600">6 h</SelectItem>
        <SelectItem value="43200">12 h</SelectItem>
        <SelectItem value="86400">24 h</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
