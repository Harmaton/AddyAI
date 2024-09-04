import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { PlusIcon } from 'lucide-react'

export default function AddAgent() {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: { name: string; description: string }) => {
    console.log('Agent created:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="w-full h-64 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <PlusIcon className="w-8 h-8 text-violet-500" />
          </div>
          <span className="text-sm text-gray-600">Create Sub Agent</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Agent</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create Agent</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

