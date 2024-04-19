import { NextRequest, NextResponse } from 'next/server';

import { createContentController } from '~api/contents/shared/controllers';
import { isSlugMatchingContent } from '~api/contents/shared/utils';
import { getApiContextValue } from '~api/shared/middleware';
import { getModelClient } from '~api/shared/model-client';

const client = getModelClient();

export async function POST(
  _req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
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
  const interaction = await contentController.incrementViews(userHash, slug);

  return NextResponse.json(interaction, { status: 201 });
}
