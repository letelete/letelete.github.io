import { NextResponse } from 'next/server';

import {
  ApiContextKey,
  apiContextKeys,
  getApiContextValue,
} from '~api/shared/middleware';

export function GET() {
  const context = Object.fromEntries(
    (Object.keys(apiContextKeys) as ApiContextKey[]).map((key) => [
      key,
      getApiContextValue(key),
    ])
  );

  return NextResponse.json(
    {
      up: true,
      context,
    },
    { status: 200 }
  );
}
