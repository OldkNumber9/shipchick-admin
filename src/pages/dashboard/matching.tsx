"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowDown } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"

export default function Matching() {
  const [searchSender, setSearchSender] = useState("")
  const [searchCarrier, setSearchCarrier] = useState("")
  const [sortSender, setSortSender] = useState("newest")
  const [sortCarrier, setSortCarrier] = useState("newest")
  const [selectedSenders, setSelectedSenders] = useState<number[]>([])
  const [selectedCarriers, setSelectedCarriers] = useState<number[]>([])

  // Sample data for senders
  const senders = [
    { id: 1, name: "Jane Cooper", type: "Cloths", weight: "5 Kg", destination: "KUNMING", status: "Active" },
    { id: 2, name: "Floyd Miles", type: "Documents", weight: "5 Kg", destination: "XIAMEN", status: "Inactive" },
    { id: 3, name: "Ronald Richards", type: "Electronics", weight: "5 Kg", destination: "NANJING", status: "Inactive" },
  ]

  // Sample data for carriers
  const carriers = [
    { id: 1, name: "Jane Cooper", type: "Cloths", weight: "5 Kg", destination: "KUNMING", status: "Active" },
    { id: 2, name: "Floyd Miles", type: "Documents", weight: "5 Kg", destination: "XIAMEN", status: "Inactive" },
    { id: 3, name: "Ronald Richards", type: "Electronics", weight: "5 Kg", destination: "NANJING", status: "Inactive" },
  ]

  const toggleSenderSelection = (id: number) => {
    setSelectedSenders((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleCarrierSelection = (id: number) => {
    setSelectedCarriers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <Layout title="MATCHING">
      <div className="bg-white rounded-md shadow p-6">
        {/* Sender Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">SENDER</h2>

          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 w-[300px]"
                placeholder="Search"
                value={searchSender}
                onChange={(e) => setSearchSender(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative">
                <select
                  className="border rounded-md px-3 py-1 pr-8 text-sm appearance-none"
                  value={sortSender}
                  onChange={(e) => setSortSender(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name">Name</option>
                </select>
                <ArrowDown
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Sender Name</TableHead>
                  <TableHead>Parcel Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {senders.map((sender) => (
                  <TableRow key={sender.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedSenders.includes(sender.id)}
                        onCheckedChange={() => toggleSenderSelection(sender.id)}
                      />
                    </TableCell>
                    <TableCell>{sender.name}</TableCell>
                    <TableCell>{sender.type}</TableCell>
                    <TableCell>{sender.weight}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                          <Image src="https://fakeimg.pl/100x100/f5f5f5/909090" alt="Parcel" width={40} height={40} />
                        </div>
                        <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                          <Image src="https://fakeimg.pl/100x100/f5f5f5/909090" alt="Parcel" width={40} height={40} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{sender.destination}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          sender.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {sender.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Carriers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">CARRIERS</h2>

          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 w-[300px]"
                placeholder="Search"
                value={searchCarrier}
                onChange={(e) => setSearchCarrier(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative">
                <select
                  className="border rounded-md px-3 py-1 pr-8 text-sm appearance-none"
                  value={sortCarrier}
                  onChange={(e) => setSortCarrier(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name">Name</option>
                </select>
                <ArrowDown
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Carriers Name</TableHead>
                  <TableHead>Parcel Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carriers.map((carrier) => (
                  <TableRow key={carrier.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCarriers.includes(carrier.id)}
                        onCheckedChange={() => toggleCarrierSelection(carrier.id)}
                      />
                    </TableCell>
                    <TableCell>{carrier.name}</TableCell>
                    <TableCell>{carrier.type}</TableCell>
                    <TableCell>{carrier.weight}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                          <Image src="https://fakeimg.pl/100x100/f5f5f5/909090" alt="Parcel" width={40} height={40} />
                        </div>
                        <div className="w-10 h-10 bg-gray-100 border rounded-md flex items-center justify-center">
                          <Image src="https://fakeimg.pl/100x100/f5f5f5/909090" alt="Parcel" width={40} height={40} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{carrier.destination}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          carrier.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {carrier.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Match Button */}
        <div className="flex justify-end">
          <Button className="bg-red-600 hover:bg-red-700 px-6">Match</Button>
        </div>
      </div>
    </Layout>
  )
}

