import type { Content, ContentInteraction, User } from '@prisma/client';

import { ModelClient } from '~api/shared/model-client';

export type { Content, ContentInteraction, User };

export const LIKES_PER_USER_LIMIT = 15;

export interface GlobalContentStatistics {
  slug: string;
  likes: number;
  views: number;
}

export interface ContentStatistics extends GlobalContentStatistics {
  userTotalLikes: number;
  reachedLikesLimit: boolean;
}

export const createContentController = (client: ModelClient) => ({
  async getAllStatistics(): Promise<GlobalContentStatistics[]> {
    const contentInteractions = await client.contentInteraction.groupBy({
      by: 'contentSlug',
      _count: {
        seen: true,
      },
      _sum: {
        likes: true,
      },
    });

    const allStatistics = contentInteractions.map(
      (next) => ({
        slug: next.contentSlug,
        views: next._count.seen ?? 0,
        likes: next._sum.likes ?? 0,
      }),
      {}
    );

    return allStatistics;
  },

  async getStatistics(
    userHash: string,
    contentSlug: string
  ): Promise<ContentStatistics> {
    const contentInteractions = await client.contentInteraction.findMany({
      where: { contentSlug, seen: true },
      select: { likes: true, userHash: true },
    });

    const views = contentInteractions.length;
    const likes = contentInteractions.reduce(
      (sum, next) => sum + next.likes,
      0
    );
    const userTotalLikes =
      contentInteractions.find(
        (interaction) => interaction.userHash === userHash
      )?.likes ?? 0;

    const reachedLikesLimit = userTotalLikes >= LIKES_PER_USER_LIMIT;

    return {
      slug: contentSlug,
      likes,
      views,
      userTotalLikes,
      reachedLikesLimit,
    };
  },

  async incrementViews(
    userHash: string,
    contentSlug: string
  ): Promise<ContentInteraction> {
    return await client.contentInteraction.upsert({
      where: {
        interactionRelation: {
          userHash,
          contentSlug,
        },
      },
      create: {
        Content: {
          connectOrCreate: {
            create: { slug: contentSlug },
            where: { slug: contentSlug },
          },
        },
        User: {
          connectOrCreate: {
            create: { hash: userHash },
            where: { hash: userHash },
          },
        },
        likes: 0,
        seen: false,
      },
      update: { seen: true },
    });
  },

  async grantLikes(
    userHash: string,
    contentSlug: string,
    userTotalLikes: number
  ): Promise<ContentInteraction> {
    const totalAmount = Math.min(LIKES_PER_USER_LIMIT, userTotalLikes);

    return await client.contentInteraction.upsert({
      where: {
        interactionRelation: {
          userHash,
          contentSlug,
        },
      },
      create: {
        Content: {
          connectOrCreate: {
            create: { slug: contentSlug },
            where: { slug: contentSlug },
          },
        },
        User: {
          connectOrCreate: {
            create: { hash: userHash },
            where: { hash: userHash },
          },
        },
        likes: 0,
        seen: false,
      },
      update: { seen: true, likes: totalAmount },
    });
  },
});
