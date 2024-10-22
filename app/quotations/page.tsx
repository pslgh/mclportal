"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Mock data for demonstration
const mockQuotations = [
  { id: "MCL-Q-20230501-0101-Rev01", clientName: "ABC Corp", subject: "IT Services", totalAmount: 5000, date: "2023-05-01" },
  { id: "MCL-Q-20230502-0201-Rev01", clientName: "XYZ Ltd", subject: "Software Development", totalAmount: 10000, date: "2023-05-02" },
  { id: "MCL-Q-20230503-0301-Rev01", clientName: "123 Industries", subject: "Network Setup", totalAmount: 7500, date: "2023-05-03" },
  // Add more mock data here...
]

const ITEMS_PER_PAGE = 10

export default function QuotationsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const totalPages = Math.ceil(mockQuotations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuotations = mockQuotations.slice(startIndex, endIndex)

  const handleViewQuotation = (id: string) => {
    router.push(`/quotations/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quotations</h1>
        <Button asChild>
          <Link href="/quotations/new">Create New Quotation</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quotation ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentQuotations.map((quotation) => (
            <TableRow key={quotation.id}>
              <TableCell>{quotation.id}</TableCell>
              <TableCell>{quotation.clientName}</TableCell>
              <TableCell>{quotation.subject}</TableCell>
              <TableCell>${quotation.totalAmount.toFixed(2)}</TableCell>
              <TableCell>{quotation.date}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewQuotation(quotation.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}