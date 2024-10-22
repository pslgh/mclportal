"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockQuotation = {
  id: "MCL-Q-20230501-0101-Rev01",
  clientName: "ABC Corp",
  clientAddress: "123 Main St, Anytown, AN 12345",
  subject: "IT Services",
  items: [
    { description: "Web Development", price: 3000 },
    { description: "Server Setup", price: 2000 },
  ],
  bottomNote: "Thank you for your business!",
  totalAmount: 5000,
  date: "2023-05-01",
  approvedBy: "John Doe",
  approvedDate: "2023-05-02",
}

export default function QuotationPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [quotation, setQuotation] = useState(mockQuotation)
  const router = useRouter()
  const { toast } = useToast()

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: `Printing quotation ${params.id}`,
    })
    // Implement actual print functionality here
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    })
    // Implement actual save functionality here
  }

  const handleCancel = () => {
    setIsEditing(false)
    setQuotation(mockQuotation) // Reset to original data
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quotation Details</h1>
        <div className="space-x-2">
          <Button onClick={handlePrint}>Print</Button>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quotation {quotation.id}</CardTitle>
          <CardDescription>Created on {quotation.date}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Client Name</Label>
            {isEditing ? (
              <Input 
                value={quotation.clientName} 
                onChange={(e) => setQuotation({...quotation, clientName: e.target.value})}
              />
            ) : (
              <p>{quotation.clientName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Client Address</Label>
            {isEditing ? (
              <Textarea 
                value={quotation.clientAddress} 
                onChange={(e) => setQuotation({...quotation, clientAddress: e.target.value})}
              />
            ) : (
              <p>{quotation.clientAddress}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Subject</Label>
            {isEditing ? (
              <Input 
                value={quotation.subject} 
                onChange={(e) => setQuotation({...quotation, subject: e.target.value})}
              />
            ) : (
              <p>{quotation.subject}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Items</Label>
            {quotation.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.description}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Bottom Note</Label>
            {isEditing ? (
              <Textarea 
                value={quotation.bottomNote} 
                onChange={(e) => setQuotation({...quotation, bottomNote: e.target.value})}
              />
            ) : (
              <p>{quotation.bottomNote}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Total Amount</Label>
            <p>${quotation.totalAmount}</p>
          </div>
          <div className="space-y-2">
            <Label>Approved By</Label>
            <p>{quotation.approvedBy}</p>
          </div>
          <div className="space-y-2">
            <Label>Approved Date</Label>
            <p>{quotation.approvedDate}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Terms & Conditions: This quotation is valid for 30 days</p>
        </CardFooter>
      </Card>
    </div>
  )
}