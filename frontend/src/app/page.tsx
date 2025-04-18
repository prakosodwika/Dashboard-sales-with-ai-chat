"use client"

import { toast, Toaster } from "sonner";
import { getSalesReps } from "./fetcher";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Sales } from "./types";
import React, { useEffect, useState } from "react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const [data, setData] = useState<Sales[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getSalesReps()
        setData(res)
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
        <CardHeader>
          <CardTitle>Sales Reps Overview</CardTitle>
          <CardDescription>Overview of the individual sales reps’ performance and activities.</CardDescription>
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
