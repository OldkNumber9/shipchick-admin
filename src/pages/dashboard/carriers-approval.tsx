"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronDown } from "lucide-react"
import Image from "next/image"
import FlightService from "@/services/flight.service"
import type { Flight } from "@/types/flight"
import ImageModal from "@/components/ImageModal"
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import FlightDetailsDialog from "@/components/FlightDetailsDialog"

export default function CarriersApproval() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [flights, setFlights] = useState<Flight[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImage, setSelectedImage] = useState<{ url: string | null, alt: string }>({ url: null, alt: "" })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [remarks, setRemarks] = useState("")

  
  const handleStatusChange = async (flightId: string, status: number) => {
    if (status === -1 && !remarks.trim()) {
      toast.error("Please enter a reason before rejecting.")
      return
    }
    if(status === -1 && remarks ==='pending'){
      toast.error("Please enter a reason before rejecting.")
      return
    }
  
    try {
      // const adminId = "your-admin-id" // Replace with real admin ID
  
      let updatedFlight
      if (status === 1) {
        updatedFlight = await FlightService.approveFlight(flightId,remarks)
      } else {
        updatedFlight = await FlightService.rejectFlight(flightId, remarks)
      }
  
      // Optional: Patch remarks separately if needed
      // if (remarks) {
      //   await FlightService.updateFlight(flightId, { remarks })
      // }
  
      setFlights((prev) =>
        prev.map((f) =>
          f._id === flightId ? { ...f, status, remarks } : f
        )
      )
  
      setIsModalOpen(false)
      setSelectedFlight(null)
      setRemarks("")
    } catch (err) {
      console.error("Error updating status:", err)
    }
  }

  
  const handleImageClick = (url: string | null, alt: string) => {
    setSelectedImage({ url, alt })
  }


  useEffect(() => {
    const fetchFlights = async () => {
      const sortField = sortBy === "newest" ? "createdAt" : sortBy === "oldest" ? "createdAt" : "flightNumber"
      const sortOrder = sortBy === "oldest" ? "asc" : "desc"

      const res = await FlightService.paginateFlights({
        page: currentPage,
        limit: 8,
        search: searchTerm,
        sortBy: sortField,
        sortOrder,
      })

      setFlights(res.data)
      setTotalPages(res.meta.lastPage)
    }

    fetchFlights()
  }, [searchTerm, sortBy, currentPage])

  const getStatusClass = (status: number) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-800" // Approved
      case -1:
        return "bg-red-100 text-red-800" // Rejected
      case 0:
        return "bg-gray-200 text-gray-800" // Pending
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout title="CARRIERS APPROVAL">
      <div className="bg-white rounded-md shadow p-4 pt-8">
        <div className="flex justify-end items-center mb-4">
          <div className="relative mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select
                className="border rounded-md px-3 py-1 pr-8 text-sm appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Flight No.</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Passport</TableHead>
              <TableHead>Boarding Pass</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight._id}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.departureLocation}</TableCell>
                <TableCell>{flight.arrivalLocation}</TableCell>
                <TableCell>
                  {flight.passSportImg ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${flight.passSportImg}`}
                      alt="passport"
                      width={40}
                      height={40}
                      onClick={() => handleImageClick(`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${flight.passSportImg}`, "passport")}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {flight.boardingPassImg ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${flight.boardingPassImg}`}
                      alt="boarding"
                      width={40}
                      height={40}
                      onClick={() => handleImageClick(`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${flight.boardingPassImg}`, "boarding pass")}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(flight.status)}`}>
                    {flight.status === 1 ? "Approved" : flight.status === -1 ? "Rejected" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm"
                    onClick={() => {
                      setSelectedFlight(flight)
                      setRemarks(flight.remarks || "")
                      setIsModalOpen(true)
                    }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing page {currentPage} of {totalPages} pages
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-md"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                variant="outline"
                size="sm"
                className={`h-8 w-8 p-0 rounded-md ${index + 1 === currentPage ? "bg-main-purple text-white" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-md"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div> 
      <FlightDetailsDialog
        selectedFlight={selectedFlight}
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)}
        handleStatusChange={handleStatusChange}
        remarks={remarks}
        setRemarks={setRemarks}
      />
      <ImageModal
              imageUrl={selectedImage.url}
              altText={selectedImage.alt}
              isOpen={!!selectedImage.url}
              onClose={() => setSelectedImage({ url: null, alt: "" })}
            />
    </Layout>
  )
}
