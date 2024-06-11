import { NextRequest, NextResponse } from 'next/server';

import {
  ContentStatistics,
  createContentController,
} from '~api/contents/shared/controllers';
import { isSlugMatchingContent } from '~api/contents/shared/utils';
import { getApiContextValue } from '~api/shared/middleware';
import { getModelClient } from '~api/shared/model-client';
import { ResponseBodyError } from '~api/shared/types';

const client = getModelClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<ContentStatistics | ResponseBodyError>> {
  const { slug } = params;

  const isValidSlug = await isSlugMatchingContent(slug);
  if (!isValidSlug) {
    return NextResponse.json(
      { error: `Slug "${slug}" not found` },
      { status: 400 }
    );
  }

  const userHash = getApiContextValue('userHash');
  if (!userHash) {
    return NextResponse.json(
      { error: `Required userHash is missing` },
      { status: 400 }
    );
  }

  const contentController = createContentController(client);
  const statistics = await contentController.getStatistics(userHash, slug);

  return NextResponse.json(statistics, { status: 200 });
}
