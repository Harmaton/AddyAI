'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PlusIcon } from "lucide-react"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export function AddMailDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      await setDoc(doc(db, "emails", value.email), {
        email: value.email,
        messageCount: 0
      });
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-64 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <PlusIcon className="w-8 h-8 text-violet-500" />
          </div>
          <span className="text-sm text-gray-600">Add Email</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Email</DialogTitle>
          <DialogDescription>
            Add an email address that will receive messages.
          </DialogDescription>
        </DialogHeader>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Email</Button>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
  )
}
