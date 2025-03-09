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

export const getErrorMessage = (error: unknown): string => {
  if (isFetchError(error)) {
    return error.data.error;
  }
  if (
    error !== null &&
    typeof error === 'object' &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    return error.error;
  }
  if (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  return 'Smth goes wrong';
};
