"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RefreshCw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PredictionResultTypes } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableAgeFilter } from "./data-table-age-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  hideDatePicker?: boolean; // Optional prop to hide the toolbar
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  hideButtonDelete?: boolean; // Optional prop to hide the delete button
}

export function DataTableToolbar<TData>({
  table,
  hideDatePicker = false, // Default to false if not provided
  globalFilter,
  hideButtonDelete = false,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  console.log(
    "Available columns:",
    table.getAllColumns().map((col) => col.id)
  );

  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [inputValue, setInputValue] = useState(globalFilter ?? "");
  const [activeType, setActiveType] = useState<string>();
  const [isDeleting, setIsDeleting] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();

    // Simpan animasi muter selama 1 detik
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter?.(inputValue);
    }, 200); // debounce input change by 200ms

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // useEffect(() => {
  //   const typeColumn = table.getColumn("type");
  //   if (typeColumn) {
  //     const currentTypeFilter = typeColumn.getFilterValue() as string[];
  //     if (currentTypeFilter && currentTypeFilter.length === 1) {
  //       setActiveType(currentTypeFilter[0]);
  //     } else {
  //       setActiveType(undefined);
  //     }
  //   }
  // }, [table.getColumn("type")?.getFilterValue()]);

  
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
      
        {/* {table.getColumn("statusBerlangganan") && (
          <DataTableFacetedFilter
            column={table.getColumn("statusBerlangganan")}
            title="Status Berlangganan"
            options={paymentTypes}
          />
        )} */}
        {table.getColumn("prediction_result") && (
          <DataTableFacetedFilter
            column={table.getColumn("prediction_result")}
            title="Hasil Prediksi"
            options={ PredictionResultTypes}
          />
        )}
        {table.getColumn("age") && (
          <DataTableAgeFilter table={table} />
        )}

        {isFiltered && (
          <Button
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        
      </div>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={handleRefresh}
            className="animate-in fade-in duration-300 ease-in-out h-8 px-3 bg-white text-gray-800 hover:bg-gray-100 dark:text-white  mr-2 cursor-pointer"
          >
            <RefreshCw
              className={cn("w-4 h-4 transition-transform", {
                "animate-spin": isRefreshing,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh data</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-2">
        {!hideButtonDelete &&
          table.getFilteredSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 px-3 bg-red-500 text-white hover:bg-red-600"
                  disabled={isRefreshing || isDeleting}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Hapus ({selectedRowsCount}) data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus {selectedRowsCount} data
                    nasabah yang dipilih? Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                 
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
