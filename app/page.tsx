import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2, FileText, ShoppingCart, Receipt, Clock } from "lucide-react"

export default function Home() {
  const features = [
    { title: "Quotation Creation", description: "Create and manage client quotations", icon: FileText, href: "/quotations" },
    { title: "Purchase Order Management", description: "Store and track purchase orders", icon: ShoppingCart, href: "/purchase-orders" },
    { title: "Expense Reimbursement", description: "Submit and track expense reimbursements", icon: Receipt, href: "/expenses" },
    { title: "Service Timesheet", description: "Record employee timesheets and generate charge summaries", icon: Clock, href: "/timesheets" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to MCL Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-6 w-6" />
                {feature.title}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={feature.href}>Go to {feature.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}