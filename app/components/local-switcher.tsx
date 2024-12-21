"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // Replace the current locale in the path with the new locale
      const newPath = `/${nextLocale}${pathname.slice(3)}`;
      router.replace(newPath);
    });
  };

  const languages = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "fr",
      label: "French",
    },
    {
      value: "rw",
      label: "Kinyarwanda",
    },
  ];

  return (
    <label className=" lg:px-4 w-full flex items-center justify-center border-gray-100y border-[1.5px] px-1 rounded gap-1">
      <Languages />
      <Select
        defaultValue={localeActive}
        onValueChange={onSelectChange}
        disabled={isPending}
        
      >
        <SelectTrigger className=" w-full bg-transparent border-none outline-none p-0">
          <SelectValue placeholder="Select a language" className="p-0" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
              className="w-full my-1"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
