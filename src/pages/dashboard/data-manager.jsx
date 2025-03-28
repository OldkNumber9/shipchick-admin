"use client"

import { useState } from "react"
// import Layout from "@/components/layout"
import Layout from '../../components/Layout';

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowDown } from "lucide-react"
import Image from "next/image"

export default function DataManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data for users
  const users = [
    { id: 1, name: "Jane Cooper", idNumber: "31******7", phone: "+66081234567890", email: "testemail@testemail.com" },
    { id: 2, name: "Floyd Miles", idNumber: "31******7", phone: "+66081234567890", email: "testemail@testemail.com" },
    {
      id: 3,
      name: "Ronald Richards",
      idNumber: "31******7",
      phone: "+66081234567890",
      email: "testemail@testemail.com",
    },
    {
      id: 4,
      name: "Marvin McKinney",
      idNumber: "31******7",
      phone: "+66081234567890",
      email: "testemail@testemail.com",
    },
    { id: 5, name: "Jerome Bell", idNumber: "31******7", phone: "+66081234567890", email: "testemail@testemail.com" },
    {
      id: 6,
      name: "Kathryn Murphy",
      idNumber: "31******7",
      phone: "+66081234567890",
      email: "testemail@testemail.com",
    },
    { id: 7, name: "Jacob Jones", idNumber: "31******7", phone: "+66081234567890", email: "testemail@testemail.com" },
    {
      id: 8,
      name: "Kristin Watson",
      idNumber: "31******7",
      phone: "+66081234567890",
      email: "testemail@testemail.com",
    },
  ]

  const handleViewDetails = (user) => {
    setSelectedUser({
      ...user,
      fullName: "John Smith",
      password: "********",
      email: "test@ailserver.com",
      phone: "+66 81 234 5678",
      id: "3 1234 56789 10 1",
      address: "111 Sathorn Rd, Bangrak Prathumwan Bangkok 12345",
      bankAccount: "KASIKORN 444 567 0168",
    })
  }

  return (
    <Layout title="DATA MANAGER">
      <div className="bg-white rounded-md shadow">
        <div className="p-4 flex justify-between items-center">
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Tel</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Full details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.idNumber}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleViewDetails(user)}>
                    View full details
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
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md bg-blue-600 text-white">
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

      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>

            <div className="flex gap-6 p-4">
              <div className="flex-1">
                <div className="flex gap-4 mb-6">
                  <div className="w-32 h-32 bg-yellow-400 rounded-md overflow-hidden">
                    <Image
                      src="https://fakeimg.pl/600x400/ffcc00/000?text=Profile"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-1">
                      <strong>NAME:</strong> {selectedUser.fullName}
                    </div>
                    <div className="mb-1">
                      <strong>PASSWORD:</strong> {selectedUser.password}
                    </div>
                    <div className="mb-1">
                      <strong>EMAIL:</strong> {selectedUser.email}
                    </div>
                    <div className="mb-1">
                      <strong>PHONE:</strong> {selectedUser.phone}
                    </div>
                    <div className="mb-1">
                      <strong>ID:</strong> {selectedUser.id}
                    </div>
                    <div className="mb-1">
                      <strong>ADDRESS:</strong> {selectedUser.address}
                    </div>
                    <div className="mb-1">
                      <strong>BANK ACCOUNT:</strong> {selectedUser.bankAccount}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium mb-2">Thai National ID Card</div>
                    <div className="border rounded-md p-2">
                      <Image
                        src="https://fakeimg.pl/600x400/f0f8ff/000?text=ID+Card"
                        alt="ID Card"
                        width={300}
                        height={200}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Bank Account</div>
                    <div className="border rounded-md p-2">
                      <Image
                        src="https://fakeimg.pl/600x400/f0fff0/000?text=Bank+Account"
                        alt="Bank Account"
                        width={300}
                        height={200}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  )
}

