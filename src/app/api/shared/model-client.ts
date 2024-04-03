import { PrismaClient } from '@prisma/client';

export type ModelClient = PrismaClient;

let client: ModelClient;

export const getModelClient = () => {
  if (client) {
    return client;
  }

  if (process.env.NODE_ENV === 'production') {
    client = new PrismaClient();
  } else {
    if (!global.modelClient) {
      global.modelClient = new PrismaClient();
    }
    client = global.modelClient;
  }

  return client;
};
