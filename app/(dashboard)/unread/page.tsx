'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Email {
    id: string;
    from: string;
    subject: string;
    body: string;
}

export default function Page() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'loan.officer@bankxyz.com',
      subject: 'Loan Application Update',
      body: 'Dear applicant, we have reviewed your loan application and require additional documentation. Please submit your latest pay stubs and tax returns at your earliest convenience.'
    },
    {
      id: '2',
      from: 'credit.analyst@bankxyz.com',
      subject: 'Credit Score Notification',
      body: 'This is to inform you that there has been a change in your credit score. Please log in to your account to view the details and any potential impact on your current loan applications.'
    },
    {
      id: '3',
      from: 'mortgage.team@bankxyz.com',
      subject: 'Mortgage Rate Changes',
      body: "We're reaching out to inform you about recent changes in our mortgage rates. This may affect your ongoing application or present new opportunities. Please contact us to discuss how this impacts your situation."
    }
  ]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isLoanDetailsOpen, setIsLoanDetailsOpen] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleReply = () => {
    // Implement reply functionality
    console.log('Reply clicked');
  };

  const handleForward = () => {
    // Implement forward functionality
    console.log('Forward clicked');
  };

  const handleSendReply = () => {
    // Implement send reply functionality
    console.log('Send reply clicked');
    setIsReplyModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="overflow-y-auto max-h-screen">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div 
              key={email.id} 
              className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleEmailClick(email)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                {email.from.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{email.from}</h3>
                <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded-full border">Unread</span>
                  <span className="text-xs text-gray-500 ml-2">1 day ago</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No unread emails in your inbox.</p>
        )}
      </div>
      <div className="p-4 border-l">
        {selectedEmail ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                  {selectedEmail.from.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h2 className="text-xl font-bold">{selectedEmail.from}</h2>
                  
                </div>
              </div>
              <div className="text-sm text-gray-500">
                1 day ago
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">To: you@example.com</p>
              <p className="text-sm text-gray-700 mb-4">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="flex items-center font-semibold mb-2">
                  <span>Quick Summary</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p className="text-sm">AI-generated summary goes here</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="flex items-center font-semibold mb-2">
                  <span>AI Loan Check Policy</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p className="text-sm">AI-generated policy check goes here</p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-600">{selectedEmail.subject}</h1>
            <div className="mb-4">
              <p>{selectedEmail.body}</p>
            </div>
            
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setIsReplyModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Reply
              </button>
              
              <button
                onClick={() => setIsLoanDetailsOpen(!isLoanDetailsOpen)}
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Loan Details
              </button>
            </div>

            {isReplyModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">Reply to Email</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
                      <input
                        type="email"
                        id="to"
                        value={selectedEmail.from}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
                      <input
                        type="text"
                        id="subject"
                        value={`Re: ${selectedEmail.subject}`}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="body" className="block text-sm font-medium text-gray-700">Message:</label>
                      <textarea
                        id="body"
                        rows={6}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={generatedReply}
                        onChange={(e) => setGeneratedReply(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => setIsReplyModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSendReply}
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoanDetailsOpen && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Loan Details</h3>
                    <button
                      onClick={() => setIsLoanDetailsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Add loan details here */}
                  <p>Loan details will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No email selected.</p>
        )}
      </div>
    </div>
  );
}
