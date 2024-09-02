

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json( { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}

