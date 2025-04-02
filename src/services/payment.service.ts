import api from "./api"
import type { Payment } from "../types/payment"

class PaymentService {
  async getPayments(filters?: { order?: string; sender?: string; carrier?: string }): Promise<Payment[]> {
    const response = await api.get("/payments", { params: filters })
    return response.data
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response = await api.get(`/payments/${id}`)
    return response.data
  }

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const response = await api.post("/payments", paymentData)
    return response.data
  }

  async updatePayment(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    const response = await api.patch(`/payments/${id}`, paymentData)
    return response.data
  }

  async deletePayment(id: string): Promise<void> {
    await api.delete(`/payments/${id}`)
  }

  async completePayment(id: string, paymentSlipUrl: string): Promise<Payment> {
    const response = await api.post(`/payments/${id}/complete`, { paymentSlipUrl })
    return response.data
  }

  async refundPayment(id: string): Promise<Payment> {
    const response = await api.post(`/payments/${id}/refund`)
    return response.data
  }
}

export default new PaymentService()

