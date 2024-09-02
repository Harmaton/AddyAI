'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      from: 'john@example.com',
      subject: 'Meeting Tomorrow',
      body: 'Hi there, just a reminder about our meeting tomorrow at 2 PM. Looking forward to seeing you!'
    },
    {
      id: '2',
      from: 'sarah@example.com',
      subject: 'Project Update',
      body: 'Hello, I wanted to give you a quick update on the project. We\'ve made significant progress and are on track to meet our deadline.'
    },
    {
      id: '3',
      from: 'mike@example.com',
      subject: 'Lunch Next Week?',
      body: "Hey! I was wondering if you'd like to grab lunch next week. Let me know if you're free!"
    },
    {
      id: '4',
      from: 'john@example.com',
      subject: 'Meeting Tomorrow',
      body: 'Hi there, just a reminder about our meeting tomorrow at 2 PM. Looking forward to seeing you!'
    },
    {
      id: '5',
      from: 'sarah@example.com',
      subject: 'Project Update',
      body: 'Hello, I wanted to give you a quick update on the project. We\'ve made significant progress and are on track to meet our deadline.'
    },
    {
      id: '6',
      from: 'mike@example.com',
      subject: 'Lunch Next Week?',
      body: "Hey! I was wondering if you'd like to grab lunch next week. Let me know if you're free!"
    }
  ]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isLoanDetailsOpen, setIsLoanDetailsOpen] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 4;
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
      {currentEmails.length > 0 ? (
          <>
            {currentEmails.map((email) => (
              <div 
                key={email.id} 
                className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleEmailClick(email)}
              >
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                  {email.from.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{email.from}</h3>
                  <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full border">Inbox</span>
                    <span className="text-xs text-gray-500 ml-2">2 hours ago</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="mx-1">
                <ArrowLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {page}
                </Button>
              ))}
              <Button onClick={handleNextPage} disabled={currentPage === totalPages} className="mx-1">
                <ArrowRight />
              </Button>
            </div>
          </>
        ) : (
          <p className="p-4 text-center text-gray-500">No new emails in your inbox.</p>
        )}
      </div>
      <div className="p-4 border-l">
        {selectedEmail ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                  {selectedEmail.from.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h2 className="text-xl font-bold">{selectedEmail.from}</h2>
                  
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {/* Replace with actual time calculation */}
                2 hours ago
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">To: {selectedEmail.from}</p>
              <p className="text-sm text-gray-700 mb-4">Date: {selectedEmail.from}</p>
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
