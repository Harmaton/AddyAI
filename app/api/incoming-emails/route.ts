import { NextRequest, NextResponse } from "next/server";
import { IncomingMail, MessageClient } from "cloudmailin";

export async function POST(request: NextRequest) {
  try {

    let mail: IncomingMail = await request.json();
    await handleEmail(mail);

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

function isAuthenticated(request: NextRequest) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      console.log("Authorization header not found");
      return false;
    }
    // use buffer to decode the base64 encoded string and compare
    const expectedPassword = process.env.PASSWORD || "cloudmailin:password";
    const headerValue = authHeader.slice("Basic ".length);
    const decHeader = Buffer.from(headerValue, "base64").toString("utf-8");
    console.log(`${expectedPassword} vs ${decHeader}`);
  
    return decHeader === expectedPassword;
  }

  async function handleEmail(mail: IncomingMail) {
    console.log(`Received email from ${mail.headers.from} with subject: ` +
      mail.headers.subject);
  
    // const client = new MessageClient({ username: userName, apiKey: apiKey });
    // const response = await client.sendMessage({
    //   to: mail.headers.from,
    //   from: "auto-response@example.com",
    //   subject: "Thanks for your email",
    //   plain: `Thanks for your email: ${mail.headers.subject}` +
    //     `\n\nwe'll respond soon.`
    // });
  
    // return response;
  }