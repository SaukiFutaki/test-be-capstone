"use client";

import { Slider } from "@/components/ui/slider";
import { Table } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableAgeFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableAgeFilter<TData>({
  table,
}: DataTableAgeFilterProps<TData>) {
  const ageFilter = table.getColumn("age")?.getFilterValue() as
    | [number, number]
    | undefined;

  const handleSliderChange = (value: [number, number]) => {
    table.getColumn("age")?.setFilterValue(value);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Slider
              id="age-filter"
              value={ageFilter ?? [0, 100]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-48"
            />
            <div className="flex items-center gap-2">
              <span>{ageFilter?.[0] ?? 0}</span>
              <span>-</span>
              <span>{ageFilter?.[1] ?? 100}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter by age</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
