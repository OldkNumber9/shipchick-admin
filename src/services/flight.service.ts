import api from "./api"
import type { Flight } from "../types/flight"

class FlightService {
  async getFlights(filters?: { carrier?: string; active?: boolean; pending?: boolean }): Promise<Flight[]> {
    const response = await api.get("/flights", {
      params: {
        carrier: filters?.carrier,
        active: filters?.active ? "true" : undefined,
        pending: filters?.pending ? "true" : undefined,
      },
    })
    return response.data
  }
  async paginateFlights({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  }: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }): Promise<{
    data: Flight[]
    meta: {
      total: number
      page: number
      lastPage: number
    }
  }> {
    const response = await api.get("/flights/paginate", {
      params: {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      },
    })
  
    return response.data
  }
  
  async getFlightById(id: string): Promise<Flight> {
    const response = await api.get(`/flights/${id}`)
    return response.data
  }

  async createFlight(flightData: Partial<Flight>): Promise<Flight> {
    const response = await api.post("/flights", flightData)
    return response.data
  }

  async updateFlight(id: string, flightData: Partial<Flight>): Promise<Flight> {
    const response = await api.patch(`/flights/${id}`, flightData)
    return response.data
  }

  async deleteFlight(id: string): Promise<void> {
    await api.delete(`/flights/${id}`)
  }

  async approveFlight(id: string, remarks: string): Promise<Flight> {
    const response = await api.post(`/flights/${id}/approve`, { remarks: remarks })
    return response.data
  }

  async rejectFlight(id: string, remarks: string): Promise<Flight> {
    const response = await api.post(`/flights/${id}/reject`, { remarks:remarks })
    return response.data
  }

  async deactivateFlight(id: string): Promise<Flight> {
    const response = await api.post(`/flights/${id}/deactivate`)
    return response.data
  }
}

export default new FlightService()

