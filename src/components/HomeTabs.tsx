"use client";
import { Computer, Image as ImageIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const tabs = [
  {
    value: "images",
    label: "Biblioteca de imagens",
    icon: <ImageIcon />,
  },
  {
    value: "devices",
    label: "Dispositivos",
    icon: <Computer />,
  },
];

export const HomeTabs = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("tab");

  const setSearchParams = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabValue);
    push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 mb-8 max-sm:w-full">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant="ghost"
          onClick={() => setSearchParams(tab.value)}
          className={` rounded-none ${param === tab.value ? "border-b-primary text-primary" : "text-muted-foreground"}`}
        >
          {tab.icon}
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
