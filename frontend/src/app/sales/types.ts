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