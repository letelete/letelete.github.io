import { NextRequest, NextResponse } from 'next/server';
import { getUserHash } from 'src/app/api/shared/utils';

import {
  ContentInteraction,
  createContentController,
} from '~api/contents/shared/controllers';
import { isSlugMatchingContent } from '~api/contents/shared/utils';
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

  const userIp = req.ip ?? '127.0.0.1';
  if (!userIp) {
    return NextResponse.json(
      { error: `Missing 'ip' in the request` },
      { status: 400 }
    );
  }

  const userHash = await getUserHash(userIp);
  const contentController = createContentController(client);

  const interaction = await contentController.grantLikes(userHash, slug, value);

  return NextResponse.json(interaction, { status: 201 });
}
