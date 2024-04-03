import { isResponseBodyError } from '../types';

export const apiFetch = async <TResponse>(
  endpoint: string,
  init?: Parameters<typeof fetch>['1']
): Promise<TResponse> => {
  const { headers: initHeaders, ...initOptions } = init ?? {};

  const response = await fetch(`/api${endpoint}`, {
    method: 'GET',
    ...initOptions,
    headers: {
      'Content-Type': 'application/json',
      ...initHeaders,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const message = isResponseBodyError(data) ? data.error : 'Unknown error';
    throw new Error(message);
  }

  return data as TResponse;
};
