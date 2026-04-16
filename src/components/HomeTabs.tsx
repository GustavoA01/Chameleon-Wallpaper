'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { tabs } from '../data/constants';

export const HomeTabs = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'images';

  const setSearchParams = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabValue);
    push(`?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 max-sm:w-full sm:flex gap-2 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant="ghost"
          onClick={() => setSearchParams(tab.value)}
          className={`rounded-none col-span-1 ${activeTab === tab.value ? 'border-b-primary text-primary' : 'text-muted-foreground'}`}
        >
          {<tab.icon />}
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
