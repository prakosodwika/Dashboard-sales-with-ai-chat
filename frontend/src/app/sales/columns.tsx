"use client"

import { Sales } from "../../lib/types"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ModalClient } from "./details/client/detail"
import { ModalDeal } from "./details/deal/detail"

export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
          className="!px-0"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
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
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
          className="!px-0"
        >
          Role
          <ArrowUpDown className="h-4 w-4" />
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
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
          className="!px-0"
        >
          Region
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "amountDeals",
    header: () => {
      return (
        <div className="text-center font-medium">
          <span>
            Amount <br /> Deals
          </span>
        </div>
      )
    },
    accessorFn: (row) => row.deals.length,
    cell: ({ getValue }) => {
      const raw = getValue() as number
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    id: "statusDeals",
    header: () => {
      return (
        <div className="text-center font-medium">
          <span>
            Status Deals <br /> (Closed Won)
          </span>
        </div>
      )
    },
    accessorFn: (row) => row.deals.filter(
      deal => deal.status === "Closed Won"
    ).length,
    cell: ({ getValue }) => {
      const raw = getValue() as string
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    id: "amountOfClients",
    header: () => {
      return (
        <div className="text-center font-medium">
          <span>
            Amount of <br /> Clients
          </span>
        </div>
      )
    },
    accessorFn: (row) => row.clients.length,
    cell: ({ getValue }) => {
      const raw = getValue() as number
      return <div className="text-center font-medium">{raw}</div>
    }
  },
  {
    id: "amountValueDeals",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(
            column.getIsSorted() === "asc"
          )}
          className="!px-0"
        >
          <span>
            Total Deal Value
          </span>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row) => row.deals.reduce(
      (sum, deal) => sum + deal.value, 0
    ),
    cell: ({ getValue }) => {
      const raw = getValue() as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(raw)
    
      return <div className="text-end font-medium">{formatted}</div>
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
  {
    header: () => <div className="text-center font-medium">Actions</div>,
    id: "actions",
    cell: ({ row }) => {
      const sales = row.original 
      return (
        <div className="flex items-center justify-center">
          <ModalClient sales={sales} />
          <ModalDeal sales={sales} />
        </div>
      )
    }
  }
]