import { NextRequest, NextResponse } from "next/server";
import { IncomingMail } from "cloudmailin";
import {  db } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'addy-ai-433906',
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON || '{}'),
});

const bucket = storage.bucket('addygcs');

export async function POST(request: NextRequest) {
  try {
    let mail: IncomingMail = await request.json();

    const recipientEmail = mail.envelope.to;

    const emailData = {
        ...mail,
        email: recipientEmail
      };
      const emailRef = doc(collection(db, 'emails'), `${recipientEmail}_${mail.envelope.from}`);
      await setDoc(emailRef, emailData);

      // Store attachments in GCP bucket
      if (mail.attachments && mail.attachments.length > 0) {
        for (const attachment of mail.attachments) {
          if (attachment.content) {
            const file = bucket.file(`attachments/${recipientEmail}/${attachment.file_name}`);
            await file.save(Buffer.from(attachment.content, 'base64'), {
              metadata: { contentType: attachment.content_type }
            });
          }
        }
      }

    return NextResponse.json(
      { message: `Thanks for the email ${mail.envelope.from}` },
      { status: 201 }
    );
  }

  catch (error) {
    return NextResponse.json(
      { message: `Error: ${error instanceof (Error) ? error.message : error}` },
      { status: 500 }
    );
  }
}
