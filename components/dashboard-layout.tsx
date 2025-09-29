"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DatePickerWithRange } from "@/components/date-range-picker"
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  CreditCard,
  ArrowUpDown,
  Package,
  Users,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  ChevronDown,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

interface DashboardLayoutProps {
  children: React.ReactNode
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  onBranchChange?: (branch: string) => void
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true },
  { icon: ShoppingCart, label: "Open Cart", href: "/cart" },
  { icon: CreditCard, label: "Transactions", href: "/transactions" },
  { icon: ArrowUpDown, label: "Transfers", href: "/transfers" },
  { icon: Package, label: "Items", href: "/items" },
  { icon: Users, label: "Credits", href: "/credits" },
  { icon: BarChart3, label: "Stock", href: "/stock" },
  { icon: Settings, label: "General", href: "/general" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
]

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

export function DashboardLayout({ children, onDateRangeChange, onBranchChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Default to false for mobile-first approach
  const [darkMode, setDarkMode] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(branches[0])
  const [isMobile, setIsMobile] = useState(false) // Track mobile state

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true) // Auto-open on desktop
      } else {
        setSidebarOpen(false) // Auto-close on mobile
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

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

  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={handleOverlayClick} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 scrollbar-thin overflow-y-auto",
          isMobile ? (sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full") : sidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <div className={cn("flex items-center gap-3", !sidebarOpen && !isMobile && "justify-center")}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg">
                POS
              </div>
              {(sidebarOpen || isMobile) && <span className="font-semibold text-sidebar-foreground">Business Pro</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isMobile && sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10 transition-all duration-200",
                  !sidebarOpen && !isMobile && "justify-center px-2",
                  item.active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {(sidebarOpen || isMobile) && <span className="truncate">{item.label}</span>}
              </Button>
            ))}
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className={cn(
                "w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
                !sidebarOpen && !isMobile && "justify-center px-2",
              )}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {(sidebarOpen || isMobile) && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className={cn("flex items-center gap-3", !sidebarOpen && !isMobile && "justify-center")}>
              <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-semibold">
                  SS
                </AvatarFallback>
              </Avatar>
              {(sidebarOpen || isMobile) && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">SS</p>
                  <p className="text-xs text-muted-foreground truncate">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-16")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-balance bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Welcome back to your business overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-background hover:bg-accent min-w-[140px]">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">{selectedBranch.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Select Branch</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.id}
                    onClick={() => handleBranchChange(branch)}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{branch.name}</span>
                      <span className="text-xs text-muted-foreground">{branch.location}</span>
                    </div>
                    {selectedBranch.id === branch.id && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DatePickerWithRange className="sm:hidden" onDateChange={onDateRangeChange} />

            <DropdownMenu className="sm:hidden">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative hover:bg-accent">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white animate-pulse">
                    {mockNotifications.length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  <Badge variant="secondary" className="ml-auto">
                    {mockNotifications.length}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3">
                      <notification.icon
                        className={cn("h-4 w-4 mt-0.5 flex-shrink-0", getNotificationIcon(notification.type))}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gradient-to-br from-background via-background to-accent/5 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
