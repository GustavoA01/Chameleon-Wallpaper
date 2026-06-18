import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const useHomeTabs = () => {
  const searchParams = useSearchParams();
  const currentParam = searchParams.get('tab') || 'images';
  const [activeTab, setActiveTab] = useState(currentParam);

  useEffect(() => {
    const syncTabFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(params.get('tab') || 'images');
    };

    window.addEventListener('popstate', syncTabFromUrl);
    return () => window.removeEventListener('popstate', syncTabFromUrl);
  }, []);

  const setSearchParams = (tabValue: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabValue);
    window.history.pushState(null, '', `?${params.toString()}`);
    setActiveTab(tabValue);
  };

  const activedColor = (value: string) =>
    activeTab === value ? 'var(--primary)' : 'var(--muted-foreground)';

  return {
    activeTab,
    setSearchParams,
    activedColor,
  };
};
