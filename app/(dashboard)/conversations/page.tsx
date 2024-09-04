import React from 'react'
import { AddMailDialog } from './_components/addMailDialog'
import Mail from './_components/go-email'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { GetReceiverEmails } from '@/app/actions/emails'

export default async function Page() {

  const emailRecipients = await GetReceiverEmails();

  console.log(emailRecipients)

  return (
    <>
    <div className='mb-4'>
      <h1 className='font-bold text-2xl'>Manage Your Email Conversations</h1>
      <p className='text-sm'>Add and monitor email addresses for your work communications</p>
    </div>
    <div className="col-span-1 mb-4">
        <AddMailDialog />
      </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* {emailRecipients.map((recipient: { id: React.Key | null | undefined; email: string; messageCount: number }) => (
        <Mail key={recipient.id} email={recipient.email} messageCount={recipient.messageCount} />
      ))} */}
    </div>
    </>
  )
}
