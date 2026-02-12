

import { useEffect, useState, useCallback } from "react";
import {
  getCache,
  setCache,
  setCacheError,
  subscribe,
  unsubscribe,
} from "./globalCache.js";

interface UseQueryResult<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  refetch: () => void;
}

export function useQuery<T>(key: string, fetcher: () => Promise<T>): UseQueryResult<T> {
  const cached = getCache<T>(key);
  const [data, setData] = useState<T | undefined>(cached.data);
  const [error, setError] = useState<unknown>(cached.error);
  const [isLoading, setIsLoading] = useState(!cached.data && !cached.error);

  const load = useCallback(() => {
    setIsLoading(true);
    fetcher()
      .then((result) => {
        setCache(key, result);
      })
      .catch((err) => {
        setCacheError(key, err);
      });
  }, [key, fetcher]);

  useEffect(() => {
    const listener = (data: T | undefined, error: unknown) => {
      setData(data);
      setError(error);
      setIsLoading(false);
    };

    subscribe<T>(key, listener);

    if (!cached.data && !cached.error) {
      load();
    }

    return () => {
      unsubscribe<T>(key, listener);
    };
  }, [key, cached.data, cached.error, load]);

  return {
    data,
    error,
    isLoading,
    refetch: load,
  };
}