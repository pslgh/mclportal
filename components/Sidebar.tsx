"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight, ChevronDown, Menu } from "lucide-react"

const menuItems = [
  {
    title: "Quotation",
    items: [
      { title: "Create New", href: "/quotations/new" },
      { title: "View All", href: "/quotations" },
    ],
  },
  {
    title: "Purchase Order",
    items: [
      { title: "Create New", href: "/purchase-orders/new" },
      { title: "View All", href: "/purchase-orders" },
    ],
  },
  {
    title: "Expense Reimbursement",
    items: [
      { title: "Submit New", href: "/expenses/new" },
      { title: "View All", href: "/expenses" },
    ],
  },
  {
    title: "Timesheets",
    items: [
      { title: "Submit New", href: "/timesheets/new" },
      { title: "View All", href: "/timesheets" },
    ],
  },
  {
    title: "User",
    items: [
      { title: "Profile", href: "/user/profile" },
      { title: "Users Management", href: "/user/management", adminOnly: true },
    ],
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-background", isOpen ? "w-64" : "w-16")}>
      <div className="flex h-16 items-center justify-between px-4">
        {isOpen && <span className="font-bold">MCL Portal</span>}
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav className="space-y-2 p-2">
        {menuItems.map((section, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-accent hover:text-accent-foreground">
              {isOpen ? (
                <>
                  <span>{section.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {isOpen &&
                section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={cn(
                      "block p-2 pl-6 text-sm hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </div>
  )
}