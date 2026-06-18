import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';

export const DeviceCardSkeleton = () => (
  <Card aria-hidden="true">
    <CardHeader>
      <CardTitle>
        <Skeleton className="h-5 w-32" />
      </CardTitle>
      <CardAction className="flex items-center gap-2">
        <Skeleton className="h-5 w-10 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardAction>
    </CardHeader>

    <CardFooter className="gap-2">
      <Skeleton className="h-10 flex-1 rounded-md" />
      <Skeleton className="h-10 w-24 rounded-md" />
      <Skeleton className="h-10 w-10 rounded-md ml-auto" />
    </CardFooter>
  </Card>
);
