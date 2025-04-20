"use client"

import { Sales } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { DataTable } from "@/app/sales/details/client/data-table"
import { columns } from "@/app/sales/details/client/columns"

interface ModalDetailProps {
  sales: Sales
}

export function ModalClient({ sales }: ModalDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sales.name} Clients</DialogTitle>
          <DialogDescription>
            Summary of the user's clients
          </DialogDescription>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={sales.clients}
        />
      </DialogContent>
    </Dialog>
  )
}
