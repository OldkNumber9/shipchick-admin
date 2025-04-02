import api from "./api"
import type { Message } from "../types/message"

class MessageService {
  async getMessages(filters?: { room?: string; sender?: string; admin?: string }): Promise<Message[]> {
    const response = await api.get("/messages", { params: filters })
    return response.data
  }

  async getMessageById(id: string): Promise<Message> {
    const response = await api.get(`/messages/${id}`)
    return response.data
  }

  async createMessage(messageData: Partial<Message>): Promise<Message> {
    const response = await api.post("/messages", messageData)
    return response.data
  }

  async updateMessage(id: string, messageData: Partial<Message>): Promise<Message> {
    const response = await api.patch(`/messages/${id}`, messageData)
    return response.data
  }

  async deleteMessage(id: string): Promise<void> {
    await api.delete(`/messages/${id}`)
  }

  async markAsRead(id: string): Promise<Message> {
    const response = await api.post(`/messages/${id}/read`)
    return response.data
  }

  async createSystemMessage(roomId: string, content: string): Promise<Message> {
    const response = await api.post("/messages/system", { roomId, content })
    return response.data
  }
}

export default new MessageService()

