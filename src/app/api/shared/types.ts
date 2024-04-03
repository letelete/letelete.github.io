export interface ResponseBodyError {
  error: string;
}

export const isResponseBodyError = (
  response: unknown
): response is ResponseBodyError => {
  return (
    response !== undefined &&
    response !== null &&
    typeof response === 'object' &&
    'error' in response
  );
};
