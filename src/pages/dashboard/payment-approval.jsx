"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowDown } from "lucide-react"

export default function PaymentApproval() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data for payments
  const payments = [
    {
      id: 1,
      carrier: "Jane Cooper",
      route: "Thailand - China",
      status: "Sent",
      weight: "5 Kg.",
      date: "08/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "pay",
    },
    {
      id: 2,
      carrier: "Floyd Miles",
      route: "Thailand - China",
      status: "Pending",
      weight: "5 Kg.",
      date: "10/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "hold",
    },
    {
      id: 3,
      carrier: "Ronald Richards",
      route: "Thailand - China",
      status: "Pending",
      weight: "5 Kg.",
      date: "10/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "hold",
    },
    {
      id: 4,
      carrier: "Marvin McKinney",
      route: "Thailand - China",
      status: "Sent",
      weight: "5 Kg.",
      date: "08/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "paid",
    },
    {
      id: 5,
      carrier: "Jerome Bell",
      route: "Thailand - China",
      status: "Sent",
      weight: "5 Kg.",
      date: "08/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "paid",
    },
    {
      id: 6,
      carrier: "Kathryn Murphy",
      route: "Thailand - China",
      status: "Sent",
      weight: "5 Kg.",
      date: "08/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "paid",
    },
    {
      id: 7,
      carrier: "Jacob Jones",
      route: "Thailand - China",
      status: "Sent",
      weight: "5 Kg.",
      date: "08/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "paid",
    },
    {
      id: 8,
      carrier: "Kristin Watson",
      route: "Thailand - China",
      status: "Pending",
      weight: "5 Kg.",
      date: "10/10/2024",
      cost: "฿ 1,750.00",
      paymentStatus: "hold",
    },
  ]

  const handlePayNow = (id) => {
    // Handle pay now action
    console.log("Pay now for ID:", id)
  }

  const handleHold = (id) => {
    // Handle hold action
    console.log("Hold payment for ID:", id)
  }

  return (
    <Layout title="PAYMENT APPROVAL">
      <div className="bg-white rounded-md shadow">
        <div className="p-4 flex justify-end items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
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
                <ArrowDown
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <Table >
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Carriers Name</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Parcel status</TableHead>
                <TableHead>Total Weight</TableHead>
                <TableHead>Transfer date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.carrier}</TableCell>
                  <TableCell>{payment.route}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.weight}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.cost}</TableCell>
                  <TableCell>
                    {payment.paymentStatus === "pay" && (
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto"
                        onClick={() => handlePayNow(payment.id)}
                      >
                        Pay now
                      </Button>
                    )}
                    {payment.paymentStatus === "hold" && (
                      <Button
                        className="bg-red-100 hover:bg-red-200 text-red-600 rounded-md px-4 py-1 text-sm font-normal"
                        onClick={() => handleHold(payment.id)}
                      >
                        Hold
                      </Button>
                    )}
                    {payment.paymentStatus === "paid" && (
                      <Button
                        className="bg-green-100 hover:bg-green-100 text-green-600 rounded-md px-4 py-1 text-sm font-normal cursor-default"
                        disabled
                      >
                        Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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

