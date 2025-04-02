export enum RoomStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface Room {
  _id: string
  name: string
  participants: any[] // Array of User objects or IDs
  sender: any // User object or ID
  carrier: any // User object or ID
  createdBy: any // User object or ID
  order: any // Order object or ID
  status: RoomStatus
  isAccepted: boolean
  isPaid: boolean
  paymentCompletedAt?: Date
  acceptedAt?: Date
  lockedAt?: Date
  createdAt: Date
  updatedAt: Date
}

