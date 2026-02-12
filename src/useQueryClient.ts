import {
  getCache,
  setCache,
  setCacheError,
} from "./globalCache.js";

export function useQueryClient() {
  return {
    getQueryData: <T>(key: string): T | undefined => {
      const { data } = getCache<T>(key);
      return data;
    },
    setQueryData: <T>(key: string, data: T): void => {
      setCache<T>(key, data);
    },
    invalidateQuery: <T>(key: string, refetch?: () => Promise<T>): void => {
      if (refetch) {
        refetch()
          .then((result) => setCache<T>(key, result))
          .catch((err) => setCacheError<T>(key, err));
      } else {
        setCache<T>(key, undefined as unknown as T); // triggers update with undefined
      }
    },
    clearQuery: (key: string): void => {
      setCache<unknown>(key, undefined as unknown);
    },
  };
}
