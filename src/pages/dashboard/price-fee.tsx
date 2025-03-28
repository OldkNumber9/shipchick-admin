"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash } from "lucide-react"

export default function PriceFee() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Sample data for routes
  const routes = [
    {
      id: 1,
      route: "BKK > PEK",
      description: "THAILAND to CHINA",
      price: "B 400.00",
      gst: "7 %",
      additionalFees: "n/a",
      total: "B 428.00",
      lastUpdate: "24 Oct, 2015 Super Admin",
    },
    {
      id: 2,
      route: "PEK > BKK",
      description: "CHINA to THAILAND",
      price: "B 400.00",
      gst: "7 %",
      additionalFees: "n/a",
      total: "B 428.00",
      lastUpdate: "24 Oct, 2015 Super Admin",
    },
    {
      id: 3,
      route: "BKK > LHR",
      description: "THAILAND to ENGLAND",
      price: "B 650.00",
      gst: "7 %",
      additionalFees: "n/a",
      total: "B 695.50",
      lastUpdate: "24 Oct, 2015 Super Admin",
    },
    {
      id: 4,
      route: "LHR > BKK",
      description: "ENGLAND to THAILAND",
      price: "B 650.00",
      gst: "7 %",
      additionalFees: "n/a",
      total: "B 695.50",
      lastUpdate: "24 Oct, 2015 Super Admin",
    },
  ]

  return (
    <Layout title="PRICE & FEES">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10 w-[300px]" placeholder="Search" />
        </div>

        <div className="flex gap-4">
          <Button onClick={() => setIsDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
            <Plus size={16} className="mr-2" /> Add Route
          </Button>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">Saved search</Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Price / Kg.</TableHead>
              <TableHead>GST/ Vat. (%)</TableHead>
              <TableHead>Additional Fees</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>
                  <div className="font-medium">{route.route}</div>
                  <div className="text-sm text-gray-500">{route.description}</div>
                </TableCell>
                <TableCell>{route.price}</TableCell>
                <TableCell>{route.gst}</TableCell>
                <TableCell>{route.additionalFees}</TableCell>
                <TableCell>{route.lastUpdate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Route</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="countryOrigins">Country Origins</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="england">England</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="airportOrigins">Airport Origins</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Airport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkk">BKK - Suvarnabhumi</SelectItem>
                  <SelectItem value="dmk">DMK - Don Mueang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryDestination">Country Destination</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="england">England</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="airportDestination">Airport Destination</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Airport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pek">PEK - Beijing Capital</SelectItem>
                  <SelectItem value="lhr">LHR - Heathrow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerKg">Price / Kg.</Label>
              <Input id="pricePerKg" placeholder="Price per Kg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalFees">Addition Fees</Label>
              <Input id="additionalFees" placeholder="Additional Fees" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstVat">GST / VAT (%)</Label>
              <Input id="gstVat" placeholder="GST / VAT %" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sum">SUM</Label>
              <Input id="sum" value="1,000.00" readOnly className="bg-gray-100" />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="bg-blue-500 hover:bg-blue-600">Add Route</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

