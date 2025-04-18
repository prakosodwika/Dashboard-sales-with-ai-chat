import { Sales } from "./types"

export async function getSalesReps(): Promise<Sales[]> {
  const url = process.env.NEXT_PUBLIC_API_URL + "sales-reps"

  await new Promise((r) => setTimeout(r, 1000))
  const res = await fetch( url , {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch sales reps")
  }

  const result = await res.json()
  return result.data.data
}
