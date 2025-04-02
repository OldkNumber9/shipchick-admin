"use client"

import { useState, useEffect } from "react"
import Layout from '../../components/Layout';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowDown } from "lucide-react"
import Image from "next/image"
import UserService from "@/services/user.service"
import type { EditRequest, User } from "@/types/user"
import ImageModal from "@/components/ImageModal" // Import the new component
import { toast } from "sonner";

interface PaginatedUsers {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}


 
export default function DataManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersData, setUsersData] = useState<PaginatedUsers>({
    users: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  })

  const [editRequestsData, setEditRequestsData] = useState<{
    editRequests: EditRequest[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    editRequests: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentEditRequestPage, setCurrentEditRequestPage] = useState(1);

  const [selectedEditRequest, setSelectedEditRequest] = useState<EditRequest | null>(null);
  // state for update data modal
  const [updateDataModalOpen, setUpdateDataModalOpen] = useState(false);
  const [loading2, setLoading2] = useState(true)



  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<{ url: string | null, alt: string }>({ url: null, alt: "" })

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await UserService.getPaginatedUsers({
        page: currentPage,
        limit: usersData.limit,
        search: searchTerm,
        sort: sortBy === 'newest' ? '-createdAt' : 'createdAt'
      })
      setUsersData(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }
  const fetchEditRequests = async () => {
    setLoading2(true);
    try {
      const data = await UserService.getPaginatedEditRequests({
        page: currentEditRequestPage,
        limit: editRequestsData.limit,
        search: searchTerm,
        sort: sortBy === 'newest' ? '-createdAt' : 'createdAt',
      });
      setEditRequestsData(data);
    } catch (error) {
      console.error('Failed to fetch edit requests:', error);
    } finally {
      setLoading2(false);
    }
  };

  const handleImageClick = (url: string | null, alt: string) => {
    setSelectedImage({ url, alt })
  }


  // Fetch user details
  // const fetchUserDetails = async (userId: string) => {
  //   try {
  //     const user = await UserService.getUserById(userId)
  //     setSelectedUser(user)
  //   } catch (error) {
  //     console.error("Failed to fetch user details:", error)
  //   }
  // }

  // Handle search and pagination changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers()
      fetchEditRequests()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, sortBy, currentPage])

  const handleViewDetails = (user: User) => {
    // fetchUserDetails(userId)
    setSelectedUser(user)
  }
  function handleUpdateData(Update:EditRequest){

    setSelectedEditRequest(Update)
    setUpdateDataModalOpen(true)

  }
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= usersData.totalPages) {
      setCurrentPage(newPage)
    }
  }

  function handleReject(_id: string) {
    // throw new Error("Function not implemented.");
    // toast.warning("Edit request rejected",{ 
    //   description: "The edit request has been rejected.",
    //   duration: 3000, 
    // })
    UserService.rejectEditRequest(_id)
      .then(async () => {
        await fetchEditRequests()
        toast.warning("Edit request rejected",{ 
          description: "The edit request has been rejected.",
          duration: 3000, 
        })
      })
      .catch((error) => {
        console.error("Failed to reject edit request:", error)
        toast.error("Failed to reject edit request", {
          description: "An error occurred while rejecting the edit request.",
          duration: 3000,
        })
      })
      .finally(() => {
        setSelectedEditRequest(null);
        setUpdateDataModalOpen(false); // Close the modal after rejection
      })
  }

  async function handleApprove(_id: string) {
    // throw new Error("Function not implemented.");
    // toast.success("Edit request approved",{ 
    //   description: "The edit request has been approved.",
    //   duration: 3000, 
    // })
    UserService.approveEditRequest(_id)
      .then(async () => {
        toast.success("Edit request approved",{ 
          description: "The edit request has been approved.",
          duration: 3000, 
        })
        await fetchEditRequests()
        await fetchUsers()
      })
      .catch((error) => {
        // console.error("Failed to approve edit request:", error)
        toast.error("Failed to reject edit request", {
          description: "An error occurred while rejecting the edit request.",
          duration: 3000,
        })
      })
      .finally(() => {
        setSelectedEditRequest(null);
        setUpdateDataModalOpen(false); // Close the modal after rejection
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
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
              }}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Loading...</TableCell>
              </TableRow>
            ) : usersData.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No users found</TableCell>
              </TableRow>
            ) : (
              usersData.users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName || 'N/A'}</TableCell>
                  <TableCell>{user.idNumber ? `${user.idNumber.substring(0, 2)}******${user.idNumber.slice(-1)}` : 'N/A'}</TableCell>
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button 
                      variant="link" 
                      className="text-blue-600 p-0 h-auto" 
                      onClick={() => handleViewDetails(user)}
                    >
                      View full details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing data {(currentPage - 1) * usersData.limit + 1} to {Math.min(currentPage * usersData.limit, usersData.total)} of {usersData.total} entries
          </div>

          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-md" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </Button>
            
            {Array.from({ length: Math.min(5, usersData.totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}

            {usersData.totalPages > 5 && (
              <>
                <span>...</span>
                <Button
                  variant={currentPage === usersData.totalPages ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md"
                  onClick={() => handlePageChange(usersData.totalPages)}
                >
                  {usersData.totalPages}
                </Button>
              </>
            )}

            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-md" 
              disabled={currentPage === usersData.totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
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
                    {selectedUser.profileImage ? (
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL+'profile/'+selectedUser.profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-1">
                      <strong>NAME:</strong> {selectedUser.fullName || 'N/A'}
                    </div>
                    <div className="mb-1">
                      <strong>EMAIL:</strong> {selectedUser.email}
                    </div>
                    <div className="mb-1">
                      <strong>PHONE:</strong> {selectedUser.phone || 'N/A'}
                    </div>
                    <div className="mb-1">
                      <strong>ID:</strong> {selectedUser.idNumber || 'N/A'}
                    </div>
                    <div className="mb-1">
                      <strong>ADDRESS:</strong> {selectedUser.address1 || 'N/A'}
                    </div>
                    <div className="mb-1">
                      <strong>BANK ACCOUNT:</strong> {selectedUser.bankAccount || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium mb-2">ID Card</div>
                    <div className="border rounded-md p-2"
                    onClick={() => handleImageClick(selectedUser.idCardImg ? process.env.NEXT_PUBLIC_API_BASE_URL + 'profile/' + selectedUser.idCardImg : null, "ID Card")}
                    >
                      {selectedUser.idCardImg ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_API_BASE_URL+'profile/'+selectedUser.idCardImg}
                          alt="ID Card"
                          width={300}
                          height={200}
                          className="w-full"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center text-gray-400">
                          No ID Card Image
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Bank Account</div>
                    <div className="border rounded-md p-2"
                    onClick={() => handleImageClick(selectedUser.bankBookImg ? process.env.NEXT_PUBLIC_API_BASE_URL + 'profile/' + selectedUser.bankBookImg : null, "Bank Account")}
                    >
                      {selectedUser.bankBookImg ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_API_BASE_URL+'profile/'+selectedUser.bankBookImg}
                          alt="Bank Account"
                          width={300}
                          height={200}
                          className="w-full"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center text-gray-400">
                          No Bank Book Image
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Passport</div>
                    <div className="border rounded-md p-2"
                     onClick={() => handleImageClick(selectedUser.passSportImg ? process.env.NEXT_PUBLIC_API_BASE_URL + 'profile/' + selectedUser.passSportImg : null, "Passport")}
                    >
                      {selectedUser.passSportImg ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_API_BASE_URL+'profile/'+selectedUser.passSportImg}
                          alt="passSportImg"
                          width={300}
                          height={200}
                          className="w-full"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center text-gray-400">
                          No Passport Image
                        </div>
                      )}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="bg-white rounded-md shadow mt-6">
        
        <div className="p-4">
          <h2>Edit Requests</h2>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {loading2 ? (
                      <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">Loading...</TableCell>
                      </TableRow>
                  ) : editRequestsData.editRequests.length === 0 ? (
                      <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">No edit requests found</TableCell>
                      </TableRow>
                  ) : (
                      editRequestsData.editRequests.map((request) => (
                          <TableRow key={request._id}>
                              <TableCell>{request.user.fullName}</TableCell>
                              <TableCell>{request.user.email}</TableCell>
                              <TableCell>{request.status}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleUpdateData(request)}>View</Button>
                                  {/* <Button variant="destructive" onClick={() => handleApprove(request._id)}>Approve</Button>
                                  <Button variant="outline" onClick={() => handleReject(request._id)}>Reject</Button> */}
                                </div>
                                  {/* <Button onClick={() => setSelectedEditRequest(request)}>View</Button>
                                  <Button onClick={() => handleApprove(request._id)}>Approve</Button>
                                  <Button onClick={() => handleReject(request._id)}>Reject</Button> */}
                              </TableCell>
                          </TableRow>
                      ))
                  )}
              </TableBody>
          </Table>
        </div>
    </div>
    
      <ImageModal
              imageUrl={selectedImage.url}
              altText={selectedImage.alt}
              isOpen={!!selectedImage.url}
              onClose={() => setSelectedImage({ url: null, alt: "" })}
      />
      {/* update data modal */}
      <Dialog open={updateDataModalOpen} onOpenChange={(open) => !open && setUpdateDataModalOpen(false)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update User Data {selectedEditRequest?.user.fullName}</DialogTitle>
          </DialogHeader>

          <div className="flex gap-6 p-4">
            <div className="flex-1"> 
              {/* loop selectedEditRequest.field to show update */}
              {selectedEditRequest && Object.entries(selectedEditRequest.fields).map(([key, newValue]) => {
                  const currentValue = selectedEditRequest.user[key as keyof User];
                  const isImage = key.toLowerCase().includes("img");

                  return (
                    <div key={key} className="mb-4 border rounded p-4">
                      <div className="font-semibold capitalize mb-2">{key}</div>
                      
                      {isImage ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Current:</p>
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${currentValue}`}
                              alt="Current"
                              className="w-40 h-28 object-cover border rounded"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Requested:</p>
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${newValue}`}
                              alt="Requested"
                              className="w-40 h-28 object-cover border rounded"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Current:</p>
                            <div className="bg-gray-100 p-2 rounded">{currentValue ?? "-"}</div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Requested:</p>
                            <div className="bg-yellow-100 p-2 rounded">{newValue}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* reason */}
                <div className="mb-4 border rounded p-4">
                  <div className="font-semibold capitalize mb-2">Reason</div>
                  <div className="bg-gray-100 p-2 rounded">{selectedEditRequest && selectedEditRequest.reason}</div>
                </div>
              <div className="flex justify-between gap-2 mt-4">

                 <Button onClick={() => selectedEditRequest && handleApprove(selectedEditRequest._id)}>Approve</Button>
                 <Button variant="destructive" onClick={() => selectedEditRequest && handleReject(selectedEditRequest._id)}>Reject</Button>
                </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}