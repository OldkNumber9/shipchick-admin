"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function SenderSubmission() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data for senders
  const senders = [
    {
      id: 1,
      name: "Jane Cooper",
      type: "Cloths",
      weight: "5 Kg.",
      destination: "KUNMING",
      status: "Approved",
    },
    {
      id: 2,
      name: "Floyd Miles",
      type: "Documents",
      weight: "5 Kg.",
      destination: "XIAMEN",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Ronald Richards",
      type: "Electronics",
      weight: "5 Kg.",
      destination: "NANJING",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Marvin McKinney",
      type: "Sampling",
      weight: "5 Kg.",
      destination: "NANJING",
      status: "Waiting",
    },
    {
      id: 5,
      name: "Jerome Bell",
      type: "Computer",
      weight: "5 Kg.",
      destination: "CHONGQING",
      status: "Waiting",
    },
    {
      id: 6,
      name: "Kathryn Murphy",
      type: "Documents",
      weight: "5 Kg.",
      destination: "CHONGQING",
      status: "Approved",
    },
    {
      id: 7,
      name: "Jacob Jones",
      type: "Gems",
      weight: "5 Kg.",
      destination: "XIAMEN",
      status: "Approved",
    },
    {
      id: 8,
      name: "Kristin Watson",
      type: "Gems",
      weight: "5 Kg.",
      destination: "BEIJING",
      status: "Rejected",
    },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Waiting":
        return "bg-gray-200 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout title="SENDER SUBMISSION">
      <div className="bg-white rounded-md shadow p-4">
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
              <TableHead>Sender Name</TableHead>
              <TableHead>Parcel Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {senders.map((sender) => (
              <TableRow key={sender.id}>
                <TableCell>{sender.name}</TableCell>
                <TableCell>{sender.type}</TableCell>
                <TableCell>{sender.weight}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                      <Image src="/placeholder.svg" alt="Parcel" width={40} height={40} />
                    </div>
                    <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                      <Image src="/placeholder.svg" alt="Parcel" width={40} height={40} />
                    </div>
                  </div>
                </TableCell>
                <TableCell>{sender.destination}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(sender.status)}`}>
                    {sender.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">Showing data 1 to 8 of 256K entries</div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md" disabled>
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md bg-main-purple text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">
              4
            </Button>
            <span>...</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">
              40
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

