export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface Order {
  _id: string
  sender: any // User object or ID
  carrier: any // User object or ID
  flight: any // Flight object or ID
  items: string
  weight: number
  width?: number
  height?: number
  depth?: number
  status: OrderStatus
  price?: number
  isAccepted: boolean
  isPaid: boolean
  paymentSlipUrl?: string
  paymentCompletedAt?: Date
  acceptedAt?: Date
  rejectedAt?: Date
  shippedAt?: Date
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

