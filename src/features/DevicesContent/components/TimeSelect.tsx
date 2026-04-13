import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Timer } from 'lucide-react';

export const TimeSelect = () => (
  <Select>
    <SelectTrigger>
      <SelectValue placeholder={<Timer />} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="horario1">30min</SelectItem>
        <SelectItem value="horario2">1h</SelectItem>
        <SelectItem value="horario2">1h e 30min</SelectItem>
        <SelectItem value="horario3">2h</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
