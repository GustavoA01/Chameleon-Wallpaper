'use client';
import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { tabs } from '../data/constants';
import { useHomeTabs } from '../hooks/useHomeTabs';

export const HomeTabs = ({
  imagesContent,
  devicesContent,
}: {
  imagesContent?: ReactNode;
  devicesContent?: ReactNode;
}) => {
  const { activeTab, setSearchParams, activedColor } = useHomeTabs();

  return (
    <>
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
                color: activedColor(tab.value),
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
      {activeTab === 'devices' ? devicesContent : imagesContent}
    </>
  );
};
