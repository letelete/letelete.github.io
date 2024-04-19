import { ModelClient } from '~api/shared/model-client';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var modelClient: ModelClient;
  }
}
