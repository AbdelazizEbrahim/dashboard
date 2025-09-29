"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { DashboardHeader } from "@/components/dashboard-header"
import type { DateRange } from "react-day-picker"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedBranch, setSelectedBranch] = useState<string>("main")

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange)
    console.log("[v0] Date range changed:", newDateRange)
  }

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch)
    console.log("[v0] Branch changed:", branch)
  }

  return (
    <DashboardLayout onDateRangeChange={handleDateRangeChange} onBranchChange={handleBranchChange}>
      <div className="space-y-6">
        

        <div className="border-t border-border/50" />

        <DashboardMetrics dateRange={dateRange} selectedBranch={selectedBranch} />
      </div>
    </DashboardLayout>
  )
}
