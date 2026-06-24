"use client"

import * as React from "react"
import { Users, Globe2, MoreHorizontal, CheckCircle2, AlertCircle, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const EXPATS = [
  { id: 1, name: "Thomas M.", country: "Germany", status: "Approved", request: "Weekend Nature Trip", date: "Oct 19, 2026" },
  { id: 2, name: "Sarah L.", country: "UK", status: "Pending", request: "Language Exchange", date: "Oct 18, 2026" },
  { id: 3, name: "Diego R.", country: "Spain", status: "Approved", request: "Cultural Tour", date: "Oct 17, 2026" },
];

const LOCALS = [
  { id: 1, name: "Aibek N.", city: "Almaty", status: "Approved", offering: "Hiking Guide", date: "Oct 18, 2026" },
  { id: 2, name: "Zarina T.", city: "Astana", status: "Pending", offering: "Food Tour", date: "Oct 19, 2026" },
  { id: 3, name: "Nurlan K.", city: "Shymkent", status: "Approved", offering: "History Guide", date: "Oct 16, 2026" },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"expats" | "locals">("expats");

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Badge variant="outline" className="mb-2 text-(--color-primary) border-(--color-primary)">Admin Portal</Badge>
              <h1 className="text-3xl font-bold text-gray-900">User Management & CRM</h1>
              <p className="text-gray-500 mt-1">Accept applications and manage manual assignments.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">5,200+</p>
              </div>
              <div className="w-px h-12 bg-gray-200 mx-2"></div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-amber-500">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-px">
          <button
            onClick={() => setActiveTab("expats")}
            className={`pb-4 px-2 text-lg font-medium transition-colors ${
              activeTab === "expats"
                ? "border-b-2 border-(--color-primary) text-(--color-primary)"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5" />
              Registered Expats
            </div>
          </button>
          <button
            onClick={() => setActiveTab("locals")}
            className={`pb-4 px-2 text-lg font-medium transition-colors ${
              activeTab === "locals"
                ? "border-b-2 border-(--color-primary) text-(--color-primary)"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Local Hosts
            </div>
          </button>
        </div>

        {/* CRM Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-5 font-semibold text-gray-600">User</th>
                  <th className="p-5 font-semibold text-gray-600">{activeTab === "expats" ? "Country" : "City"}</th>
                  <th className="p-5 font-semibold text-gray-600">Status</th>
                  <th className="p-5 font-semibold text-gray-600">{activeTab === "expats" ? "Custom Request" : "Offering"}</th>
                  <th className="p-5 font-semibold text-gray-600">Registered</th>
                  <th className="p-5 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(activeTab === "expats" ? EXPATS : LOCALS).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-medium text-gray-900">{user.name}</td>
                    <td className="p-5 text-gray-600">{"country" in user ? user.country : user.city}</td>
                    <td className="p-5">
                      {user.status === "Approved" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approved
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-3">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" /> Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-5 text-gray-600">
                      {"request" in user ? (
                        <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">{user.request}</span>
                      ) : (
                        <span className="bg-(--color-background) px-3 py-1 rounded-md text-sm text-(--color-primary)">{user.offering}</span>
                      )}
                    </td>
                    <td className="p-5 text-gray-500 text-sm">{user.date}</td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        {user.status === "Pending" ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8">Approve</Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-8 border-(--color-primary) text-(--color-primary) flex items-center gap-1.5">
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                            Assign Leisure
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-center">
            <Button variant="ghost" className="text-gray-500 text-sm">Load more records</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
