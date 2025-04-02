"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash } from "lucide-react"

import { getRoutes, createRoute, updateRoute } from "@/services/route.service"
import { Route } from "@/types/route"

export default function PriceFee() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [routes, setRoutes] = useState<Route[]>([])
  const [form, setForm] = useState<Partial<Route>>({})
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [editId, setEditId] = useState<string | null>(null)

  const fetchRoutes = async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    const res = await getRoutes(params)
    setRoutes(res.data)
    setTotalPages(res.totalPages)
  }

  useEffect(() => {
    fetchRoutes()
  }, [page])

  const handleSubmit = async () => {
    if (editId) {
      await updateRoute(editId, form)
    } else {
      await createRoute(form)
    }
    setForm({})
    setEditId(null)
    setIsDialogOpen(false)
    fetchRoutes()
  }

  const handleEdit = (route: Route) => {
    setForm(route)
    setEditId(route._id || null)
    setIsDialogOpen(true)
  }

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
              <TableRow key={route._id}>
                <TableCell>
                  <div className="font-medium">{route.originAirport} &gt; {route.destinationAirport}</div>
                  <div className="text-sm text-gray-500">{route.originCountry} to {route.destinationCountry}</div>
                </TableCell>
                <TableCell>{route.pricePerKg}</TableCell>
                <TableCell>{route.gstPercent ?? 0}</TableCell>
                <TableCell>{route.additionalFees ?? 0}</TableCell>
                <TableCell>{route.updatedAt?.split("T")[0]}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(route)}>
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

      <div className="flex justify-end mt-4 gap-2">
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <span className="self-center">Page {page} of {totalPages}</span>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit' : 'Add'} Route</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Country Origins</Label>
              <Input value={form.originCountry || ''} onChange={(e) => setForm({ ...form, originCountry: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Airport Origins</Label>
              <Input value={form.originAirport || ''} onChange={(e) => setForm({ ...form, originAirport: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Country Destination</Label>
              <Input value={form.destinationCountry || ''} onChange={(e) => setForm({ ...form, destinationCountry: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Airport Destination</Label>
              <Input value={form.destinationAirport || ''} onChange={(e) => setForm({ ...form, destinationAirport: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Price / Kg.</Label>
              <Input type="number" value={form.pricePerKg || ''} onChange={(e) => setForm({ ...form, pricePerKg: parseFloat(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Addition Fees</Label>
              <Input type="number" value={form.additionalFees || 0} onChange={(e) => setForm({ ...form, additionalFees: parseFloat(e.target.value) })} />
            </div>

            <div className="space-y-2">
              <Label>GST / VAT (%)</Label>
              <Input type="number" value={form.gstPercent || 0} onChange={(e) => setForm({ ...form, gstPercent: parseFloat(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>SUM</Label>
              <Input readOnly className="bg-gray-100" value={
                form.pricePerKg && form.gstPercent
                  ? ((form.pricePerKg * (1 + form.gstPercent / 100)) + (form.additionalFees || 0)).toFixed(2)
                  : ''
              } />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>{editId ? 'Update' : 'Add'} Route</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
