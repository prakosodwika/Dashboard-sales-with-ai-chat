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
import { BadgeInfo } from "lucide-react"
import { DataTable } from "@/app/sales/details/deal/data-table"
import { columns } from "@/app/sales/details/deal/columns"

interface ModalDetailProps {
  sales: Sales
}

export function ModalDeal({ sales }: ModalDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <BadgeInfo className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sales.name} Deals</DialogTitle>
          <DialogDescription>
            Summary of the user's deals
          </DialogDescription>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={sales.deals}
        />
      </DialogContent>
    </Dialog>
  )
}
