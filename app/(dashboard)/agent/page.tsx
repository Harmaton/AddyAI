'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'


export default function Page() {
  const [hasAgent, setHasAgent] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: { name: string; description: string }) => {
    console.log(data);
    setHasAgent(true);
  };

  return (
    <div className="p-2">
      {!hasAgent ? (
       <div className="bg-white rounded-lg shadow-md p-6">
       <h2 className="text-2xl font-bold mb-4">Create Your Agent</h2>
       <p className="mb-4">You dont have an agent yet. Create one to get started with your chatbot.</p>
       <Dialog>
         <DialogTrigger asChild>
           <Button className="bg-violet-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
             Create Agent
           </Button>
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
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Agent</h2>
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sessions">View Sessions</TabsTrigger>
              <TabsTrigger value="edit">Edit Chatbot</TabsTrigger>
            </TabsList>
            <TabsContent value="sessions">
              {/* Content for View Sessions */}
              <p>Sessions content goes here</p>
            </TabsContent>
            <TabsContent value="edit">
              {/* Content for Edit Chatbot */}
              <p>Edit chatbot content goes here</p>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
