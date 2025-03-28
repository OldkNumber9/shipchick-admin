"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Package,
  Truck,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for statistics
  const stats = [
    {
      title: "Total Users",
      value: "2,856",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-5 w-5 text-red-600" />,
    },
    {
      title: "Pending Shipments",
      value: "145",
      change: "+3.2%",
      trend: "up",
      icon: <Package className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Active Carriers",
      value: "78",
      change: "-2.5%",
      trend: "down",
      icon: <Truck className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Revenue",
      value: "฿125,430",
      change: "+18.2%",
      trend: "up",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
    },
  ]

  // Sample data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      user: "Jane Cooper",
      type: "Payment",
      amount: "฿1,750.00",
      status: "Completed",
      date: "Today, 13:45",
    },
    {
      id: 2,
      user: "Floyd Miles",
      type: "Refund",
      amount: "฿850.00",
      status: "Processing",
      date: "Today, 10:23",
    },
    {
      id: 3,
      user: "Ronald Richards",
      type: "Payment",
      amount: "฿2,150.00",
      status: "Completed",
      date: "Yesterday, 15:30",
    },
    {
      id: 4,
      user: "Marvin McKinney",
      type: "Payment",
      amount: "฿1,250.00",
      status: "Completed",
      date: "Yesterday, 12:15",
    },
    {
      id: 5,
      user: "Jerome Bell",
      type: "Refund",
      amount: "฿950.00",
      status: "Failed",
      date: "Oct 12, 2023",
    },
  ]

  // Sample data for recent submissions
  const recentSubmissions = [
    {
      id: 1,
      sender: "Jane Cooper",
      parcelType: "Cloths",
      destination: "KUNMING",
      status: "Approved",
      date: "Today, 14:30",
    },
    {
      id: 2,
      sender: "Floyd Miles",
      parcelType: "Documents",
      destination: "XIAMEN",
      status: "Rejected",
      date: "Today, 11:45",
    },
    {
      id: 3,
      sender: "Ronald Richards",
      parcelType: "Electronics",
      destination: "NANJING",
      status: "Rejected",
      date: "Yesterday, 16:20",
    },
    {
      id: 4,
      sender: "Marvin McKinney",
      parcelType: "Sampling",
      destination: "NANJING",
      status: "Waiting",
      date: "Yesterday, 09:15",
    },
    {
      id: 5,
      sender: "Jerome Bell",
      parcelType: "Computer",
      destination: "CHONGQING",
      status: "Waiting",
      date: "Oct 12, 2023",
    },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Processing":
      case "Waiting":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                  Monthly Shipments
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-32 w-32 text-gray-300 mx-auto" />
                  <p className="text-gray-500 mt-4">Bar chart showing monthly shipment volumes</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-red-600" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-32 w-32 text-gray-300 mx-auto" />
                  <p className="text-gray-500 mt-4">Line chart showing revenue trends</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-red-600" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="font-medium">{transaction.user}</div>
                          <div className="text-xs text-gray-500">{transaction.date}</div>
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Package className="h-5 w-5 mr-2 text-red-600" />
                  Recent Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="font-medium">{submission.sender}</div>
                          <div className="text-xs text-gray-500">{submission.date}</div>
                        </TableCell>
                        <TableCell>{submission.parcelType}</TableCell>
                        <TableCell>{submission.destination}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(submission.status)}`}>
                            {submission.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Submissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-32 w-32 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-4">Detailed analytics would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-32 w-32 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-4">Generated reports would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center justify-center h-24 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200">
              <Package className="h-6 w-6 mb-2" />
              <span>New Submission</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200">
              <Truck className="h-6 w-6 mb-2" />
              <span>Carrier Approval</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Payment Approval</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

