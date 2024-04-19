import { NextRequest, NextResponse } from 'next/server';

import {
  ContentInteraction,
  createContentController,
} from '~api/contents/shared/controllers';
import { isSlugMatchingContent } from '~api/contents/shared/utils';
import { getApiContextValue } from '~api/shared/middleware';
import { getModelClient } from '~api/shared/model-client';
import { ResponseBodyError } from '~api/shared/types';

const client = getModelClient();

interface PostBody {
  value?: number;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<ContentInteraction> | NextResponse<ResponseBodyError>> {
  const { slug } = params;

  const body = (await req.json()) as PostBody;
  const { value } = body;

  if (!value) {
    return NextResponse.json(
      { error: 'Missing `value` in the request body.' },
      { status: 400 }
    );
  }

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
  const interaction = await contentController.grantLikes(userHash, slug, value);

  return NextResponse.json(interaction, { status: 201 });
}
