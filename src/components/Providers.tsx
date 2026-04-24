'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';
import { ProvidersProps } from '../data/types/components';

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <Toaster />
  </QueryClientProvider>
);
