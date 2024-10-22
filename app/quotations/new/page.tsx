"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const formSchema = z.object({
  clientCompanyName: z.string().min(2, { message: "Client company name is required" }),
  clientCompanyAddress: z.string().min(5, { message: "Client company address is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  items: z.array(z.object({
    description: z.string().min(1, { message: "Item description is required" }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Price must be a positive number" }),
  })),
  bottomNote: z.string(),
  approvedBy: z.string().min(2, { message: "Approved by is required" }),
  approvedDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Please enter a valid date" }),
})

export default function NewQuotationPage() {
  const { toast } = useToast()
  const [totalPrice, setTotalPrice] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientCompanyName: "",
      clientCompanyAddress: "",
      subject: "",
      items: [{ description: "", price: "" }],
      bottomNote: "",
      approvedBy: "",
      approvedDate: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the data to your backend
    console.log(values)
    toast({
      title: "Quotation created",
      description: "Your new quotation has been successfully created.",
    })
    form.reset()
  }

  function calculateTotal() {
    const total = form.getValues().items.reduce((sum, item) => sum + Number(item.price), 0)
    setTotalPrice(total)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Quotation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="clientCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientCompanyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Company Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter client company address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="Item description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="number" placeholder="Price" onChange={(e) => {
                                field.onChange(e)
                                calculateTotal()
                              }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="button" onClick={() => append({ description: "", price: "" })} className="mt-2">Add Item</Button>
          </div>
          <div>Total Price: ${totalPrice.toFixed(2)}</div>
          <FormField
            control={form.control}
            name="bottomNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bottom Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter bottom note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>Terms & Conditions: This quotation is valid for 30 days</div>
          <FormField
            control={form.control}
            name="approvedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approved By</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="approvedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approved Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Quotation</Button>
        </form>
      </Form>
    </div>
  )
}