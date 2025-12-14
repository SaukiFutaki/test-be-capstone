"use client";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { DataTableRowActionsDetail } from "@/components/data-table-components/data-table-row-actions-detail";
import { Checkbox } from "@/components/ui/checkbox";
import { PredictionData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const columnsDemo: ColumnDef<PredictionData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="truncate text-xs">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <div>{row.getValue("age")} years</div>,
  },
  {
    accessorKey: "job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => <Badge>{row.getValue("job")}</Badge>,
  },
  {
    accessorKey: "prediction_result",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription Result" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("prediction_result") as string;
      const isSubscribed = value.toLowerCase() === "yes";
      return isSubscribed ? (
        <Badge className="bg-green-100 text-green-800">Subscribed</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800">Not Subscribed</Badge>
      );
    },
  },
  {
    accessorKey: "prediction_probability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription Probability" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("prediction_probability") as number;
      const scorePercentage = value * 100;

      let progressColorClass = "[&>div]:bg-red-500";
      let badgeColorClass = "bg-red-100 text-red-800";

      if (scorePercentage >= 70) {
        badgeColorClass = "bg-green-100 text-green-800";
        progressColorClass = "[&>div]:bg-green-500";
      } else if (scorePercentage >= 50) {
        badgeColorClass = "bg-blue-100 text-blue-800";
        progressColorClass = "[&>div]:bg-blue-500";
      } else if (scorePercentage >= 30) {
        badgeColorClass = "bg-yellow-100 text-yellow-800";
        progressColorClass = "[&>div]:bg-yellow-500";
      }
      const getStatusLabel = (percentage: number) => {
        if (percentage >= 70) return "Tinggi";
        if (percentage >= 50) return "Sedang";
        if (percentage >= 30) return "Rendah";
        return "Sangat Rendah";
      };

      return (
        <div className="flex flex-col gap-2 w-48">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {scorePercentage.toFixed(1)}%
            </span>
            <Badge className={`text-xs font-medium  ${badgeColorClass}`}>
              {getStatusLabel(scorePercentage)}
            </Badge>
          </div>

          <Progress
            value={scorePercentage}
            className={`h-2 ${progressColorClass}`}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Detail",
    cell: ({ row }) => <DataTableRowActionsDetail row={row} />,
  },
];
