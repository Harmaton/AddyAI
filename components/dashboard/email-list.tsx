'use client'

import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase';

interface Email {
  id: string;
  subject: string;
  from: string;
  to: string;
  text: string;
  timestamp: Date;
}

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'emails'), orderBy('timestamp', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const emailList: Email[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Email, 'id'>)
      }));
      setEmails(emailList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recent Emails</h1>
      <ul className="space-y-4">
        {emails.map((email) => (
          <li key={email.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{email.subject}</h2>
            <p className="text-sm text-gray-600">From: {email.from}</p>
            <p className="text-sm text-gray-600">To: {email.to}</p>
            <p className="mt-2">{email.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;