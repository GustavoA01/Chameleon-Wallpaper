'use client';
import { motion } from 'motion/react';
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
          className={`relative rounded-none col-span-1 overflow-visible border-b border-b-transparent ${activeTab === tab.value ? 'border-b-primary text-primary' : 'text-muted-foreground'}`}
        >
          <motion.span
            animate={{
              color:
                activeTab === tab.value
                  ? 'var(--primary)'
                  : 'var(--muted-foreground)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            {<tab.icon />}
            {tab.label}
          </motion.span>
          {activeTab === tab.value && (
            <motion.div
              layoutId="home-tabs-active-line"
              className="absolute -bottom-px left-0 right-0 h-px bg-primary"
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
};
