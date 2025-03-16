
import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FilterIcons } from "./filter-icons"

type FilterItem = {
  id: string
  title: string
  icon: keyof typeof FilterIcons
  content?: React.ReactNode
}

type FilterAccordionProps = {
  items: FilterItem[]
  className?: string
}

export function FilterAccordion({ items, className }: FilterAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const Icon = FilterIcons[item.icon]
        const isOpen = openItems[item.id]

        return (
          <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-gray-600" />
                <span className="text-base font-medium text-gray-700">{item.title}</span>
              </div>
              <ChevronDown
                className={cn("size-5 text-gray-600 transition-transform duration-200", isOpen ? "rotate-180" : "")}
              />
            </button>

            {item.content && (
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 pb-4" : "max-h-0",
                )}
              >
                <div className="px-4">{item.content}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

