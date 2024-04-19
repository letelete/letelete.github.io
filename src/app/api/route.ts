import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ up: true }, { status: 200 });
}
