// Предикат типа. Объясняет какой тип вернется
export const isFetchError = (e: unknown): e is { data: { error: string } } =>
  e !== null &&
  typeof e === 'object' &&
  'data' in e &&
  typeof e.data === 'object' &&
  e.data !== null &&
  'error' in e.data &&
  typeof e.data.error === 'string';

// Вместо предиката можно использовать zod
