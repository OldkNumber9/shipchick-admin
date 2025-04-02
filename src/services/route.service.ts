// services/route.service.ts
import api from "./api"
import { Route } from "@/types/route"

// export const getRoutes = async (): Promise<Route[]> => {
//   const response = await api.get("/routes")
//   return response.data
// }
// route.service.ts
export const getRoutes = async (params: URLSearchParams): Promise<{
    data: Route[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> => {
    const response = await api.get(`/routes?${params.toString()}`)
    return response.data
  }
  

export const createRoute = async (data: Partial<Route>): Promise<Route> => {
  const response = await api.post("/routes", data)
  return response.data
}

export const updateRoute = async (id: string, data: Partial<Route>): Promise<Route> => {
  const response = await api.put(`/routes/${id}`, data)
  return response.data
}

export const deleteRoute = async (id: string): Promise<void> => {
  await api.delete(`/routes/${id}`)
}
