"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b">
      <div className="px-4 flex items-center justify-between h-16">
        <Image
          className="h-12 w-auto"
          src="/images/logo.png?height=48&width=48"
          alt="Your Company"
          width={48}
          height={48}
        />
        <Button className="font-bold text-lg" asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </nav>
  )
}