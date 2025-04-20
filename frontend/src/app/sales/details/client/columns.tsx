"use client"

import { Client } from "@/lib/types"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "industry",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Industry
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          Contact
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const raw = getValue() as string
      return <div className="text-end font-medium">{raw}</div>
    }
  }
]