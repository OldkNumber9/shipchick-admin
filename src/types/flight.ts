export interface Flight {
  _id: string
  flightNumber: string
  carrier: any // User object or ID
  approvedBy?: any // Admin object or ID
  status: number // 0: pending, 1: approved, -1: rejected
  departureLocation: string
  arrivalLocation: string
  departureDate: Date
  arrivalDate: Date
  availableWeight?: number
  availableWidth?: number
  availableHeight?: number
  availableDepth?: number
  passSportImg?: string
  boardingPassImg?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

