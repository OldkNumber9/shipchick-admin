import api from "./api"
import type { Order } from "../types/order"

class OrderService {
  async getOrders(filters?: { sender?: string; carrier?: string }): Promise<Order[]> {
    const response = await api.get("/orders", { params: filters })
    return response.data
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`)
    return response.data
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const response = await api.post("/orders", orderData)
    return response.data
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    const response = await api.patch(`/orders/${id}`, orderData)
    return response.data
  }

  async deleteOrder(id: string): Promise<void> {
    await api.delete(`/orders/${id}`)
  }

  async acceptOrder(id: string): Promise<Order> {
    const response = await api.post(`/orders/${id}/accept`)
    return response.data
  }

  async rejectOrder(id: string): Promise<Order> {
    const response = await api.post(`/orders/${id}/reject`)
    return response.data
  }

  async markAsPaid(id: string, paymentSlipUrl: string): Promise<Order> {
    const response = await api.post(`/orders/${id}/pay`, { paymentSlipUrl })
    return response.data
  }

  async markAsShipped(id: string): Promise<Order> {
    const response = await api.post(`/orders/${id}/ship`)
    return response.data
  }

  async markAsDelivered(id: string): Promise<Order> {
    const response = await api.post(`/orders/${id}/deliver`)
    return response.data
  }
}

export default new OrderService()

