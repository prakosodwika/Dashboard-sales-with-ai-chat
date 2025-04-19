"use client"

import AISheet from "./ai-sheet";
import { columns } from "./columns";
import { toast, Toaster } from "sonner";
import { Sales } from "../../lib/types";
import { DataTable } from "./data-table";
import { getSalesReps } from "../../lib/fetcher";
import React, { useEffect, useState } from "react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function SalesReps() {
  const [data, setData] = useState<Sales[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getSalesReps()
        setData(data)
      } catch (error) {
        toast.error("Failed to fetch data. Please try again later.", {
          style: {
            backgroundColor: 'red',
            color: 'white',
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="mb-2">Sales Representatives Overview</CardTitle>
            <CardDescription>Overview of the individual sales reps’ performance and activities.</CardDescription>
          </div>
          
          <AISheet />
        </CardHeader>

        <CardContent>
          <DataTable 
            columns={columns} 
            data={data} 
            isLoading={loading} 
          />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
