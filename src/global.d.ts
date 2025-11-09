import { ModelClient } from '~api/shared/model-client';

declare module '*.css';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var modelClient: ModelClient;
  }
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
