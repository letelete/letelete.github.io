import { NextResponse } from 'next/server';
import { ResponseBodyError } from 'src/app/api/shared/types';

import {
  GlobalContentStatistics,
  createContentController,
} from '~api/contents/shared/controllers';
import { getModelClient } from '~api/shared/model-client';

const client = getModelClient();

export async function GET(): Promise<
  NextResponse<GlobalContentStatistics[] | ResponseBodyError>
> {
  const contentController = createContentController(client);

  const allStatistics = await contentController.getAllStatistics();

  return NextResponse.json(allStatistics, { status: 200 });
}
