'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    owner: string;
}

export default function Page() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Loan_Application.pdf',
      type: 'PDF',
      size: '2.5 MB',
      owner: 'john@example.com'
    },
    {
      id: '2',
      name: 'Financial_Statement.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      owner: 'sarah@example.com'
    },
    {
      id: '3',
      name: 'Property_Appraisal.pdf',
      type: 'PDF',
      size: '3.2 MB',
      owner: 'mike@example.com'
    }
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download clicked');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share clicked');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="overflow-y-auto max-h-screen">
        {documents.length > 0 ? (
          documents.map((document) => (
            <div 
              key={document.id} 
              className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDocumentClick(document)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                {document.type.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{document.name}</h3>
                <p className="text-sm text-gray-600">{document.owner}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full border">Attachment</span>
                  <span className="text-xs text-gray-500 ml-2">{document.size}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No documents available.</p>
        )}
      </div>
      <div className="p-4 border-l">
        {selectedDocument ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                  {selectedDocument.type.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedDocument.name}</h2>
                  <p className="text-sm text-gray-600">{selectedDocument.owner}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {selectedDocument.size}
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="flex items-center font-semibold mb-2">
                  <span>AI Analysis</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p className="text-sm">AI-generated analysis of the document goes here</p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {isDetailsModalOpen && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Document Details</h3>
                    <button
                      onClick={() => setIsDetailsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Add document details here */}
                  <p>Document details will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No document selected.</p>
        )}
      </div>
    </div>
  );
}
