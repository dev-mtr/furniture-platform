"use client";

import { useState } from "react";
import { MOCK_MATERIALS } from "@/lib/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaterialSearchProps {
  value: string; // materialId
  onChange: (materialId: string) => void;
}

export function MaterialSearch({ value, onChange }: MaterialSearchProps) {
  const [open, setOpen] = useState(false);

  const selected = MOCK_MATERIALS.find((m) => m.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md border border-input bg-background px-2 py-1 text-xs h-8 font-normal hover:bg-muted transition-colors outline-none"
      >
        {selected ? (
          <span className="truncate">{selected.name}</span>
        ) : (
          <span className="text-slate-400">Избери материал...</span>
        )}
        <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Търси материал..." className="h-9 text-sm" />
          <CommandList>
            <CommandEmpty>Няма намерени материали.</CommandEmpty>
            <CommandGroup>
              {MOCK_MATERIALS.map((material) => (
                <CommandItem
                  key={material.id}
                  value={`${material.name} ${material.thickness}`}
                  onSelect={() => {
                    onChange(material.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === material.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{material.name}</p>
                    <p className="text-xs text-slate-400">
                      {material.thickness}мм · {material.pricePerM2} лв/м²
                      {!material.inStock && (
                        <span className="ml-1 text-amber-500">· Изчерпан</span>
                      )}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
