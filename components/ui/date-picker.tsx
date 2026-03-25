"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  placeholder?: string
  className?: string
}

export function DatePicker({ selected, onSelect, disabled, placeholder = "Pick a date", className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = "d"
  const rows = []
  let days = []
  let day = startDate

  // Generate calendar grid
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = new Date(day)
      const isDisabled = disabled ? disabled(cloneDay) : false
      const isSelected = selected ? isSameDay(cloneDay, selected) : false
      const isCurrentMonth = isSameMonth(cloneDay, monthStart)
      const isTodayDate = isToday(cloneDay)

      days.push(
        <button
          key={day.toString()}
          className={cn(
            "h-9 w-9 p-0 font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors",
            !isCurrentMonth && "text-muted-foreground opacity-50",
            isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isTodayDate && !isSelected && "bg-accent text-accent-foreground",
            isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
          )}
          onClick={() => {
            if (!isDisabled && onSelect) {
              onSelect(cloneDay)
              setIsOpen(false)
            }
          }}
          disabled={isDisabled}
        >
          {format(cloneDay, dateFormat)}
        </button>,
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div key={day.toString()} className="flex w-full">
        {days}
      </div>,
    )
    days = []
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          {/* Header */}
          <div className="flex justify-center pt-1 relative items-center mb-4">
            <button
              onClick={prevMonth}
              className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</div>
            <button
              onClick={nextMonth}
              className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="flex w-full mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="h-9 w-9 text-center text-[0.8rem] font-normal text-muted-foreground flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="space-y-1">{rows}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
