import { NextRequest, NextResponse } from "next/server";
import { IncomingMail } from "cloudmailin";
import { db } from "@/firebase";
import { arrayUnion, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { Storage } from '@google-cloud/storage';
import { GoogleGenerativeAI } from "@google/generative-ai";

const storage = new Storage({
  projectId: 'addy-ai-433906',
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON || '{}'),
});

const bucket = storage.bucket('addygcs');

export async function POST(request: NextRequest) {
  try {
    // Track the mail
    let mail: IncomingMail = await request.json();

    // Extract the receiver addresses
    const recipientEmails = mail.envelope.recipients

    // Process each recipient email
    for (const recipientEmail of recipientEmails) {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      
      // Generate a summary of the subject using gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a short summary of this email ${mail.plain}`;
      const result = await model.generateContent(prompt);
      const subjectSummary = result.response.text();

      // Generate JSON return type loan details using gemini
      let jsonmodel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      
      let jsonprompt = `
      List the important details from this email for loan origination from the email: ${mail.plain} :
      { "type": "object",
        "properties": {
          "name": { "type": "string" },
          "contacts": { 
            "type": "object",
            "properties": {
              "phone": { "type": "string" },
              "email": { "type": "string" }
            }
          },
          "address": { "type": "string" },
          "urgency": { "type": "string" },
          "loanAmount": { "type": "number" },
          "interestRate": { "type": "number" },
          "term": { "type": "string" },
          "employmentStatus": { "type": "string" },
          "annualIncome": { "type": "number" }
        }
      }`;

      let loanData = await jsonmodel.generateContent(jsonprompt);
      const loanDetails = JSON.parse(loanData.response.text());

      // Generate a response using gemini
      const responseprompt = `Generate a friendly response to ${mail.envelope.from}, do not include their email in the response but only the name. His email body is ${mail.plain}, also, ask for any detail not recorded or null in ${loanDetails}`;
      const responsedata = await model.generateContent(responseprompt);
      const generatedResponse = responsedata.response.text();

      const loanpolicy = `
        {
          "minimumCreditScore": 650,
          "maximumDebtToIncomeRatio": 0.43,
          "minimumEmploymentDuration": "2 years",
          "maximumLoanAmount": 500000,
          "minimumDownPayment": 0.20,
          "interestRateRange": {
            "min": 0.03,
            "max": 0.06
          },
          "loanTerms": ["15 years", "30 years"],
          "requiredDocuments": [
            "Proof of Income",
            "Bank Statements",
            "Tax Returns",
            "Employment Verification"
          ]
        }
      `;

      // Check from the subject if the person is ELIGIBLE
      const eligibilityPrompt = `
        Based on the email content: ${mail.plain}
        Determine if the applicant is eligible for our loan policy.
        our loan policy is ${loanpolicy}
          Where 'isEligible' is true if the applicant meets our criteria, false otherwise.
        'reason' should provide a brief explanation for the decision.
        Return a JSON object with the following structure:
        { "type": "object",
          "properties": {
            "isEligible": { "type": "boolean" },
            "reason": { "type": "string" }
          }
        }
      `;
      
      const eligibilityResult = await jsonmodel.generateContent(eligibilityPrompt);
      const eligibilityData = JSON.parse(eligibilityResult.response.text());

      // Store all data under the email data
      const emailData = {
        ...mail,
        email: recipientEmail,
        subjectSummary,
        loanDetails,
        generatedResponse,
        eligibilityData,
        timestamp: new Date().toISOString()
      };

      // Store the email in Firebase with the new structure
      const recipientDocRef = doc(db, 'emails', recipientEmail);

      // Check if the document exists
      const docSnap = await getDoc(recipientDocRef);

      if (docSnap.exists()) {
        // Document exists, update it
        await updateDoc(recipientDocRef, {
          messages: arrayUnion(emailData)
        });
      } else {
        // Document doesn't exist, create it
        await setDoc(recipientDocRef, {
          messages: [emailData]
        });
      }

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
    }

    return NextResponse.json(
      { message: `Thanks for the email ${mail.envelope.from}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error: ${error instanceof Error ? error.message : error}` },
      { status: 500 }
    );
  }
}