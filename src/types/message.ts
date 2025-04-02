export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  SYSTEM = "system",
}

export enum SenderType {
  USER = "user",
  ADMIN = "admin",
  SYSTEM = "system",
}

export interface Message {
  _id: string
  room: any // Room object or ID
  sender?: any // User object or ID
  adminSender?: any // Admin object or ID
  content: string
  type: MessageType
  senderType: SenderType
  imageUrl?: string
  isRead: boolean
  readAt?: Date
  createdAt: Date
  updatedAt: Date
}

