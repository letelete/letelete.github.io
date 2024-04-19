export const count = (array: string[]): Map<string, number> => {
  return array.reduce((countMap, entry) => {
    return countMap.set(entry, (countMap.get(entry) ?? 0) + 1);
  }, new Map<string, number>());
};

export const findRepeatingElements = <T>(
  array: T[],
  serializeEntry?: (entry: T) => string
) => {
  const serialized = serializeEntry
    ? array.map(serializeEntry)
    : ([...array] as string[]);

  if (serialized.some((entry) => typeof entry !== 'string')) {
    throw new Error(
      'Entry must be serialized to string. If your array stores non-string elements, provide `serializeEntry` function.'
    );
  }

  const serializedCount = count(serialized);
  return [...serializedCount]
    .filter(([, count]) => count > 1)
    .map(([entry]) => entry);
};

export const pickRandom = <T>(source: T[]): T | null => {
  const length = source.length;
  const index = Math.floor(Math.random() * (length - 1));
  return source[index] ?? null;
};
