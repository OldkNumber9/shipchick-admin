import { Route } from "./route"
import { User } from "./user"


export interface Flight {
  _id: string
  flightNumber: string
  // carrier: any // User object or ID
  approvedBy?: any // Admin object or ID
  status: number // 0: pending, 1: approved, -1: rejected
  remarks:string
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
  route?: Route
  carrier?:User
}

