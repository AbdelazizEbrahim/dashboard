"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  ShoppingBag,
  Wallet,
  PieChart,
  TrendingUp,
  Package,
  AlertTriangle,
  Eye,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ElementType
  color: "green" | "blue" | "red" | "purple"
  transactions: number
  total: string
  yesterday: string
}

function MetricCard({ title, value, change, icon: Icon, color, transactions, total, yesterday }: MetricCardProps) {
  const colorClasses = {
    green: "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25",
    blue: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25",
    red: "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25",
    purple: "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25",
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10" />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("rounded-xl p-3", colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {value}
            </div>
            <Badge
              variant={change >= 0 ? "default" : "destructive"}
              className={cn(
                "gap-1 px-2 py-1",
                change >= 0
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200",
              )}
            >
              {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-medium">{transactions} transactions</p>
          <div className="flex justify-between text-xs border-t pt-2">
            <span className="text-muted-foreground">Yesterday</span>
            <span className="font-medium">{yesterday}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium text-green-600">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardMetricsProps {
  dateRange?: { from: Date; to: Date }
  selectedBranch?: string
}

export function DashboardMetrics({ dateRange, selectedBranch }: DashboardMetricsProps) {
  const getMetricsData = () => {
    const baseData = {
      main: {
        sales: { value: "$15,750", change: 12.5, transactions: 28, total: "$15,815.31", yesterday: "$14,000" },
        purchases: { value: "$9,200", change: 8.3, transactions: 18, total: "$73,199", yesterday: "$8,500" },
        expenses: { value: "$1,850", change: -5.2, transactions: 12, total: "$0", yesterday: "$1,950" },
        profit: { value: "$4,700", change: 32.4, transactions: 0, total: "$15,815.31", yesterday: "$3,550" },
      },
      addis: {
        sales: { value: "$12,450", change: 8.7, transactions: 22, total: "$12,500.25", yesterday: "$11,500" },
        purchases: { value: "$7,800", change: 5.1, transactions: 15, total: "$65,000", yesterday: "$7,400" },
        expenses: { value: "$1,650", change: -2.8, transactions: 10, total: "$0", yesterday: "$1,700" },
        profit: { value: "$3,000", change: 18.2, transactions: 0, total: "$12,500.25", yesterday: "$2,540" },
      },
      bole: {
        sales: { value: "$18,900", change: 15.3, transactions: 35, total: "$19,200.50", yesterday: "$16,400" },
        purchases: { value: "$11,200", change: 12.1, transactions: 25, total: "$85,500", yesterday: "$10,000" },
        expenses: { value: "$2,100", change: -8.5, transactions: 15, total: "$0", yesterday: "$2,300" },
        profit: { value: "$5,600", change: 28.9, transactions: 0, total: "$19,200.50", yesterday: "$4,350" },
      },
    }

    return baseData[selectedBranch as keyof typeof baseData] || baseData.main
  }

  const metricsData = getMetricsData()

  return (
    <div className="space-y-8">
      {/* Main Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Today's Sales"
          value={metricsData.sales.value}
          change={metricsData.sales.change}
          icon={DollarSign}
          color="green"
          transactions={metricsData.sales.transactions}
          total={metricsData.sales.total}
          yesterday={metricsData.sales.yesterday}
        />
        <MetricCard
          title="Today's Purchases"
          value={metricsData.purchases.value}
          change={metricsData.purchases.change}
          icon={ShoppingBag}
          color="blue"
          transactions={metricsData.purchases.transactions}
          total={metricsData.purchases.total}
          yesterday={metricsData.purchases.yesterday}
        />
        <MetricCard
          title="Today's Expenses"
          value={metricsData.expenses.value}
          change={metricsData.expenses.change}
          icon={Wallet}
          color="red"
          transactions={metricsData.expenses.transactions}
          total={metricsData.expenses.total}
          yesterday={metricsData.expenses.yesterday}
        />
        <MetricCard
          title="Today's Profit"
          value={metricsData.profit.value}
          change={metricsData.profit.change}
          icon={PieChart}
          color="purple"
          transactions={metricsData.profit.transactions}
          total={metricsData.profit.total}
          yesterday={metricsData.profit.yesterday}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Inventory Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <Package className="h-5 w-5" />
              </div>
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  1,250
                </p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent">
                <Eye className="h-4 w-4" />
                View Details
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Value: $187,500</span>
                <Badge variant="outline" className="gap-1">
                  <Eye className="h-3 w-3" />
                  Hidden
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Low Stock Status</span>
                  <Badge variant="destructive" className="gap-1 animate-pulse">
                    <AlertTriangle className="h-3 w-3" />
                    23 Critical
                  </Badge>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Critical</span>
                    <Badge variant="destructive" className="ml-auto">
                      23
                    </Badge>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Items requiring immediate attention</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Net Position</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  $13,000
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">Receivables</p>
                  <p className="text-xl font-bold text-blue-800">$45,000</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
                  <p className="text-sm text-orange-700 font-medium">Payables</p>
                  <p className="text-xl font-bold text-orange-800">$32,000</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <h4 className="text-sm font-medium">Profit Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gross Profit</span>
                    <span className="font-medium">$75,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Net Profit</span>
                    <span className="font-medium">$47,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Margin</span>
                    <span className="font-medium text-green-600">20.89%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Top Customers */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <CreditCard className="h-5 w-5" />
              </div>
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">Cash</span>
                <div className="flex items-center gap-3">
                  <Progress value={55} className="w-24 h-2" />
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">$125,000</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Card</span>
                <div className="flex items-center gap-3">
                  <Progress value={38} className="w-24 h-2" />
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">$85,000</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800">
                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Bank Transfer</span>
                <div className="flex items-center gap-3">
                  <Progress value={7} className="w-24 h-2" />
                  <span className="text-sm font-bold text-purple-700 dark:text-purple-300">$15,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                <Users className="h-5 w-5" />
              </div>
              Top Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Smith", spent: "$12,500", transactions: 28 },
                { name: "Sarah Johnson", spent: "$9,800", transactions: 22 },
                { name: "Michael Brown", spent: "$8,750", transactions: 19 },
                { name: "Emily Davis", spent: "$7,200", transactions: 16 },
              ].map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-white">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.transactions} transactions</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {customer.spent}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
