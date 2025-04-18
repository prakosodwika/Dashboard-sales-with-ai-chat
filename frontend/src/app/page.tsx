"use client"

import React, { useEffect, useState } from "react"
import { columns, Sales } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData(): Promise<Sales[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  await new Promise((r) => setTimeout(r, 1000))
  const res = await fetch(baseUrl + 'sales-reps', {
    headers: {
      "Content-Type": "application/json"
    }
  })
  
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const result = await res.json()
  return result.data.data
}

export default function Home() {
  const [data, setData] = useState<Sales[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getData()
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
          <DataTable columns={columns} data={data} isLoading={loading} />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
