export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export interface Payment {
  _id: string
  order: any // Order object or ID
  sender: any // User object or ID
  carrier: any // User object or ID
  amount: number
  status: PaymentStatus
  paymentSlipUrl?: string
  completedAt?: Date
  refundedAt?: Date
  transactionId?: string
  createdAt: Date
  updatedAt: Date
}

