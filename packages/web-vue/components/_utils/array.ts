export const union = <T>(
  target: Iterable<T>,
  source: Iterable<T>,
  difference = false
): T[] => {
  if (difference) {
    const sourceSet = source instanceof Set ? source : new Set(source);
    const result: T[] = [];
    for (const item of target) {
      if (!sourceSet.has(item)) {
        result.push(item);
      }
    }
    return result;
  }

  const resultSet = new Set<T>();
  for (const item of target) {
    resultSet.add(item);
  }
  for (const item of source) {
    resultSet.add(item);
  }
  return Array.from(resultSet);
};

export const getReverse = <T>(array: T[]): T[] => {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = array[array.length - 1 - i];
  }
  return result;
};
