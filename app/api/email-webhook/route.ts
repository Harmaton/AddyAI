import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { from, to, subject, text, html } = body;
      
      // Store the email in Firestore
      const docRef = await addDoc(collection(db, 'emails'), {
        from,
        to,
        subject,
        text,
        html,
        timestamp: new Date()
      });

      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error('Error storing email:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to store email' }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ error: `Method ${req.method} Not Allowed` }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Allow": "POST",
      },
    });
  }
}
