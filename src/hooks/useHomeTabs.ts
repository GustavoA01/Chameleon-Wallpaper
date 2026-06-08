import { useRouter, useSearchParams } from 'next/navigation';

export const useHomeTabs = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'images';

  const setSearchParams = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabValue);
    push(`?${params.toString()}`);
  };

  const activedColor = (value: string) =>
    activeTab === value ? 'var(--primary)' : 'var(--muted-foreground)';

  return {
    activeTab,
    setSearchParams,
    activedColor,
  };
};
