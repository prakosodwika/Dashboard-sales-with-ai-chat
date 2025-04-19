import { Sales } from "./types"

const baseUrl = process.env.NEXT_PUBLIC_API_URL 

export async function getSalesReps(): Promise<Sales[]> {
  const url = baseUrl + "sales-reps"

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

export async function getAnswerAI(question: string): Promise<any> {
  const url = baseUrl + "ai"

  const res = await fetch( url , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: question }),
  })

  if (!res.ok) {
    throw new Error("Failed to fetch ai")
  }

  const result = await res.json()
  return result.data
}
