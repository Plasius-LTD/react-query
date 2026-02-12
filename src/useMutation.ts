

import { useState, useCallback } from "react";

interface UseMutationOptions<TData, TError, TVariables, TContext = unknown> {
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext | void;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | undefined,
    variables: TVariables | undefined,
    context: TContext | undefined
  ) => void;
}

interface UseMutationResult<TData, TError, TVariables, TContext = unknown> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
  data: TData | undefined;
  error: TError | undefined;
  isLoading: boolean;
  context: TContext | undefined;
}

export function useMutation<TData, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<TError>();
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<TContext | undefined>(undefined);

  const mutateAsync = useCallback(async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (options?.onMutate) {
        setContext((await options.onMutate(variables)) as TContext | undefined);
      }
      const result = await mutationFn(variables);
      setData(result);
      options?.onSuccess?.(result, variables, context);
      options?.onSettled?.(result, undefined, variables, context);
      return result;
    } catch (err) {
      const typedErr = err as TError;
      setError(typedErr);
      options?.onError?.(typedErr, variables, context);
      options?.onSettled?.(undefined, typedErr, variables, context);
      throw typedErr as Error;
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn, options]);

  const mutate = useCallback((variables: TVariables) => {
    void mutateAsync(variables);
  }, [mutateAsync]);

  const reset = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setIsLoading(false);
    setContext(undefined);
  }, []);

  return {
    mutate,
    mutateAsync,
    reset,
    data,
    error,
    isLoading,
    context
  };
}