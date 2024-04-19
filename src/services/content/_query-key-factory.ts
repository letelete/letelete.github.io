export const contentKeys = {
  all() {
    return ['content'] as const;
  },
  statistics() {
    return [...this.all(), 'statistics'] as const;
  },
  statistic(contentSlug: string) {
    return [...this.statistics(), contentSlug] as const;
  },
} as const;
