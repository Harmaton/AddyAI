'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface EmailProps {
  id: string;
  messages: any[];
}

export default function Mail({ id, messages }: EmailProps) {
  const email = id; // Use the id as the email address
  const initial = email.charAt(0).toUpperCase();
  const router = useRouter();
  const messageCount = messages ? messages.length : 0;

  const handleClick = () => {
    router.push(`/conversations/${id}`);
  };

  return (
    <div 
      className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mb-2">
        {initial}
      </div>
      <span className="text-sm text-gray-600">{email}</span>
      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mt-1">
        {messageCount}
      </span>
    </div>
  )
}
