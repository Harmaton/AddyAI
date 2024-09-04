'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import AddAgent from './_components/add-agent'


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
       <div className="bg-white rounded-lg p-6">
       <h2 className="text-2xl font-bold mb-4">Create Your AI Assistant</h2>
       <p className="mb-4">You havent set up an AI assistant yet. Create one to start automating your communications and tasks.</p>
        <AddAgent />
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
