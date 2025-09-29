"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Bell, MapPin, ChevronDown, Clock, AlertCircle, CheckCircle, Info, Search, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

interface DashboardHeaderProps {
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  onBranchChange?: (branch: string) => void
}

const mockNotifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    message: "23 items are running low on stock",
    type: "warning",
    time: "2 minutes ago",
    icon: AlertCircle,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "$2,450 payment received from John Smith",
    type: "success",
    time: "15 minutes ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "New Order",
    message: "Order #1234 has been placed",
    type: "info",
    time: "1 hour ago",
    icon: Info,
  },
  {
    id: 4,
    title: "System Update",
    message: "System maintenance scheduled for tonight",
    type: "info",
    time: "3 hours ago",
    icon: Info,
  },
]

const branches = [
  { id: "main", name: "Main Branch", location: "Downtown" },
  { id: "addis", name: "Addis Branch", location: "Addis Ababa" },
  { id: "bole", name: "Bole Branch", location: "Bole District" },
]

export function DashboardHeader({ onDateRangeChange, onBranchChange }: DashboardHeaderProps) {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])

  const handleBranchChange = (branch: (typeof branches)[0]) => {
    setSelectedBranch(branch)
    onBranchChange?.(branch.id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "text-amber-500"
      case "success":
        return "text-green-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">


      {/* Right side - Controls */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <Button variant="outline" size="sm" className="gap-2 hover:bg-accent bg-transparent">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search</span>
        </Button>

        {/* Branch Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-background hover:bg-accent min-w-[140px] shadow-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="hidden sm:inline font-medium">{selectedBranch.name}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Select Branch
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {branches.map((branch) => (
              <DropdownMenuItem
                key={branch.id}
                onClick={() => handleBranchChange(branch)}
                className="flex items-center gap-3 p-3 cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-medium">{branch.name}</span>
                  <span className="text-xs text-muted-foreground">{branch.location}</span>
                </div>
                {selectedBranch.id === branch.id && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Picker */}
        <DatePickerWithRange onDateChange={onDateRangeChange} />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="relative hover:bg-accent shadow-sm bg-transparent">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white animate-pulse border-2 border-background">
                {mockNotifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center gap-2 p-3">
              <Bell className="h-4 w-4" />
              <span className="font-semibold">Notifications</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {mockNotifications.length} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex items-start gap-3 p-4 cursor-pointer hover:bg-accent/50"
                >
                  <notification.icon
                    className={cn("h-4 w-4 mt-0.5 flex-shrink-0", getNotificationIcon(notification.type))}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700 p-3 cursor-pointer">
              <span className="w-full">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="outline" size="sm" className="hover:bg-accent shadow-sm bg-transparent">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
