

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // const imap = await connect();
    // const emails = await fetchEmails(imap);
    // imap.end();
    return NextResponse.json( { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}

