import { NextResponse } from 'next/server';

import {
  GlobalContentStatistics,
  createContentController,
} from '~api/contents/shared/controllers';
import { getModelClient } from '~api/shared/model-client';
import { ResponseBodyError } from '~api/shared/types';

const client = getModelClient();

export async function GET(): Promise<
  NextResponse<GlobalContentStatistics[] | ResponseBodyError>
> {
  const contentController = createContentController(client);

  const allStatistics = await contentController.getAllStatistics();

  return NextResponse.json(allStatistics, { status: 200 });
}
