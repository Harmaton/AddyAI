import React from 'react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="lightgray" strokeWidth="0.5" />
        <rect x="20%" y="0" width="60%" height="100%" fill="none" stroke="lightgray" strokeWidth="0.5" />
      </svg>
      <div className="text-center border-l border-r border-gray-300 px-8 py-16 max-w-3xl mx-auto relative z-10 space-y-8">
        <div className="inline-block bg-transparent text-gray border p-4 text-sm font-semibold px-3 py-1 rounded-full mb-4">
          The #1 AI for Lending
        </div>
        <h1 className="text-5xl font-bold">Revolutionizing Loan Origination with AI</h1>
        <p className="text-lg">
          Experience the future of lending with our AI-powered loan origination platform. 
          Intelligent Document Processing for streamlined workflows, automated underwriting, 
          and data-driven decision making. Leverage cutting-edge AI solutions to transform 
          your lending process, increase efficiency, and enhance customer experiences.
        </p>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white mt-4">
          Book a Demo
        </Button>
      </div>
    </div>
  )
}
