import { NextRequest, NextResponse } from 'next/server';

import { apiMiddleware } from '~api/shared/middleware';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api')) {
    return apiMiddleware(req);
  }

  return NextResponse.next();
}
