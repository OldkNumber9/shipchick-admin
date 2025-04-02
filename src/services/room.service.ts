import api from "./api"
import type { Room } from "../types/room"

class RoomService {
  async getRooms(filters?: { sender?: string; carrier?: string; order?: string }): Promise<Room[]> {
    const response = await api.get("/rooms", { params: filters })
    return response.data
  }

  async getRoomById(id: string): Promise<Room> {
    const response = await api.get(`/rooms/${id}`)
    return response.data
  }

  async createRoom(roomData: Partial<Room>): Promise<Room> {
    const response = await api.post("/rooms", roomData)
    return response.data
  }

  async updateRoom(id: string, roomData: Partial<Room>): Promise<Room> {
    const response = await api.patch(`/rooms/${id}`, roomData)
    return response.data
  }

  async deleteRoom(id: string): Promise<void> {
    await api.delete(`/rooms/${id}`)
  }

  async acceptRoom(id: string): Promise<Room> {
    const response = await api.post(`/rooms/${id}/accept`)
    return response.data
  }

  async markAsPaid(id: string): Promise<Room> {
    const response = await api.post(`/rooms/${id}/pay`)
    return response.data
  }

  async lockRoom(id: string): Promise<Room> {
    const response = await api.post(`/rooms/${id}/lock`)
    return response.data
  }

  async addParticipant(id: string, userId: string): Promise<Room> {
    const response = await api.post(`/rooms/${id}/participants`, { userId })
    return response.data
  }

  async removeParticipant(id: string, userId: string): Promise<Room> {
    const response = await api.delete(`/rooms/${id}/participants/${userId}`)
    return response.data
  }
}

export default new RoomService()

