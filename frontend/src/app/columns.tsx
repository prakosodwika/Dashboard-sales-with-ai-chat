"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Sales = {
  id: number
  name: string
  role: string
  region: string
  skills: string[]
  deals: Deal[]
  clients: Client[]
}

export type Deal = {
  client: string
  value: number
  status: string
}

export type Client = {
  name: string
  industry: string
  contact: string
}

export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Region
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "amountDeals",
    header: () => <div className="text-center font-medium">Amount Deals</div>,
    accessorFn: (row) => row.deals.length,
    cell: ({ getValue }) => {
      const raw = getValue() as number
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    id: "statusDeals",
    header: () => <div className="text-center font-medium">Deals Closed Won</div>,
    accessorFn: (row) => row.deals.filter(deal => deal.status === "Closed Won").length,
    cell: ({ getValue }) => {
      const raw = getValue() as string
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    id: "amountValueDeals",
    // header: () => <div className="text-right font-medium">Amount Value Deals</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Deal Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row) => row.deals.reduce((sum, deal) => sum + deal.value, 0),
    cell: ({ getValue }) => {
      const raw = getValue() as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(raw)
    
      return <div className="text-center font-medium">{formatted}</div>
    }
  },
  {
    id: "amountOfClients",
    header: () => <div className="text-center font-medium">Amount of Clients</div>,
    accessorFn: (row) => row.clients.length,
    cell: ({ getValue }) => {
      const raw = getValue() as number
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    header: "Skills",
  accessorKey: "skills",
  cell: ({ getValue }) => {
    const skills = getValue() as string[]

    return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    )
  },
  },
]