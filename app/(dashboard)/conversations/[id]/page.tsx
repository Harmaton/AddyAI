'use client'

import { collection, doc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactTimeago from 'react-timeago'
import { ReplyDialog } from "./_components/reply-dialog";
import { DetailsDialog } from "./_components/details-dialog";
import { GetMessagesForEmail } from "@/app/actions/emails";

export default function Page({ params }: { params: { id: string } }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
 
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 4;

  useEffect(() => {
    const fetchMessages = async () => {
      if (params.id) {
        const result = await GetMessagesForEmail(params.id);
        if (result.success && Array.isArray(result.messages)) {
          setEmails(result.messages);
        } else {
          console.error('Failed to fetch messages:', result.error);
          setEmails([]);
        }
      }
    };
    fetchMessages();
  }, [params.id]);


  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);


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

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="overflow-y-auto max-h-screen">
        {currentEmails.length > 0 ? (
          <>
            {currentEmails.map((email) => (
              <div 
                key={email.headers.message_id} 
                className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleEmailClick(email)}
              >
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                  {email.headers.from.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{email.headers.from}</h3>
                  <p className="text-sm text-gray-600 truncate">{email.headers.subject}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded-full border">Inbox</span>
                    <ReactTimeago date={new Date(email.headers.date)} />
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
                  {selectedEmail.headers.from.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedEmail.headers.from}</h2>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <ReactTimeago date={new Date(selectedEmail.headers.date)} />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">To: {selectedEmail.headers.to}</p>
              <p className="text-sm text-gray-700 mb-4">Date: {selectedEmail.headers.date}</p>
            </div>
            <div className="space-y-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="flex items-center font-semibold mb-2">
                  <span>Quick Summary</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p className="text-sm">{selectedEmail.subjectSummary}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="flex items-center font-semibold mb-2">
                  <span>AI Loan Check Policy</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p className="text-sm">
                  Eligibility: {selectedEmail.eligibilityData.isEligible ? 'Eligible' : 'Not Eligible'}
                  <br />
                  Reason: {selectedEmail.eligibilityData.reason}
                </p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-600">{selectedEmail.headers.subject}</h1>
            <div className="mb-4">
              <p>{selectedEmail.plain}</p>
            </div>
            <div className="flex space-x-4 mt-4">
            
              <ReplyDialog email={selectedEmail} />
              <DetailsDialog email={selectedEmail} />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No email selected.</p>
        )}
      </div>
     
    </div>
  );}