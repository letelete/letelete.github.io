import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getUserHash } from '~api/shared/utils';

export async function apiMiddleware(req: NextRequest) {
  const headers = new Headers(req.headers);

  const clientIp = req.ip ?? '127.0.0.1';
  if (!clientIp) {
    return NextResponse.json(
      { error: `Missing 'ip' in the request` },
      { status: 400 }
    );
  }
  headers.set(apiContextKeys.clientIp, clientIp);

  const userHash = await getUserHash(clientIp);
  headers.set(apiContextKeys.userHash, userHash);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const apiContextKeys = {
  clientIp: 'api-context-client-ip',
  userHash: 'api-context-user-hash',
} as const;

export type ApiContextKey = keyof typeof apiContextKeys;

export const getApiContextValue = (key: ApiContextKey) => {
  const headersList = headers();

  return headersList.get(apiContextKeys[key]);
};
