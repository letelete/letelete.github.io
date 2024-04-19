import { NextRequest, NextResponse } from 'next/server';
import { getUserHash } from 'src/app/api/shared/utils';

import { createContentController } from '~api/contents/shared/controllers';
import { isSlugMatchingContent } from '~api/contents/shared/utils';
import { getModelClient } from '~api/shared/model-client';

const client = getModelClient();

export async function POST(
  req: NextRequest,
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

  const userIp = req.ip ?? '127.0.0.1';
  if (!userIp) {
    return NextResponse.json(
      { error: `Missing 'ip' in the request` },
      { status: 400 }
    );
  }

  const userHash = await getUserHash(userIp);
  const contentController = createContentController(client);

  const interaction = await contentController.incrementViews(userHash, slug);

  return NextResponse.json(interaction, { status: 201 });
}
