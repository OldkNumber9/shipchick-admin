"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronDown, MoreHorizontal, Plus, Pencil, Trash } from "lucide-react"

export default function UserRoles() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Sample data for users
  const users = [
    {
      id: 1,
      name: "David Wagner",
      email: "david@example.com",
      role: "Super Admin",
      createdAt: "24 Oct, 2023",
      status: "Active",
    },
    {
      id: 2,
      name: "Tim Rogers",
      email: "tim@example.com",
      role: "Admin",
      createdAt: "18 Oct, 2023",
      status: "Active",
    },
    {
      id: 3,
      name: "Maria Sanchez",
      email: "maria@example.com",
      role: "Admin",
      createdAt: "15 Sep, 2023",
      status: "Active",
    },
    {
      id: 4,
      name: "John Taylor",
      email: "john@example.com",
      role: "Admin",
      createdAt: "5 Sep, 2023",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Emily Watson",
      email: "emily@example.com",
      role: "Super Admin",
      createdAt: "15 Jun, 2023",
      status: "Active",
    },
    {
      id: 6,
      name: "Victoria Ross",
      email: "victoria@example.com",
      role: "Admin",
      createdAt: "22 Apr, 2023",
      status: "Active",
    },
    {
      id: 7,
      name: "Gary Mitchell",
      email: "gary@example.com",
      role: "Admin",
      createdAt: "7 Mar, 2023",
      status: "Inactive",
    },
  ]

  const getStatusClass = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <Layout title="USERS ROLE">
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={() => setIsDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
              <Plus size={16} className="mr-2" /> Add Admin
            </Button>

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
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>User Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(user.status)}`}>{user.status}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID *</Label>
              <Input id="userId" placeholder="User ID" />
            </div>
            <div></div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" placeholder="First Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" placeholder="Last Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailId">Email ID *</Label>
              <Input id="emailId" type="email" placeholder="Email ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile No</Label>
              <Input id="mobileNo" placeholder="Mobile No" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input id="username" placeholder="Username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleType">Select Role Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input id="password" type="password" placeholder="Password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm Password" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-4 mt-4">
            <div className="text-center mb-4">
              <h3 className="font-medium">Module Permissions</h3>
            </div>

            <div className="grid grid-cols-4 gap-4 font-medium text-center border-b pb-2">
              <div>Role Name</div>
              <div>Confirm</div>
              <div>Chat</div>
              <div>Payment</div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-2 border-b">
              <div>Super Admin</div>
              <div className="flex justify-center">
                <Checkbox checked disabled />
              </div>
              <div className="flex justify-center">
                <Checkbox checked disabled />
              </div>
              <div className="flex justify-center">
                <Checkbox checked disabled />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-2 border-b">
              <div>Admin</div>
              <div className="flex justify-center">
                <Checkbox checked />
              </div>
              <div className="flex justify-center">
                <Checkbox />
              </div>
              <div className="flex justify-center">
                <Checkbox />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-2 border-b">
              <div>Employee</div>
              <div className="flex justify-center">
                <Checkbox checked />
              </div>
              <div className="flex justify-center">
                <Checkbox />
              </div>
              <div className="flex justify-center">
                <Checkbox />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="bg-blue-500 hover:bg-blue-600">Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

