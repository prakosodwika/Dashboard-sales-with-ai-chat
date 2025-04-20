"use client"

import { Deal } from "@/lib/types"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Deal>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!px-0"
      >
          Client
          <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "value",
    id: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
        >
          Value
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const raw = getValue() as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(raw)
    
      return <div className="text-start font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
          className="!px-0"
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const raw = getValue() as string
      return <div className="text-end font-medium">{raw}</div>
    }
  },
]