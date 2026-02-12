

type Listener<T> = (data: T | undefined, error: unknown) => void;

interface CacheEntry<T> {
  data?: T;
  error?: unknown;
  listeners: Set<Listener<T>>;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function getCache<T>(key: string): { data?: T; error?: unknown } {
  const entry = cache.get(key);
  return entry ? { data: entry.data as T, error: entry.error } : {};
}

export function setCache<T>(key: string, data: T): void {
  let entry = cache.get(key);
  if (!entry) {
    entry = { listeners: new Set() };
    cache.set(key, entry);
  }
  entry.data = data;
  entry.error = undefined;
  entry.listeners.forEach(listener => listener(data, undefined));
}

export function setCacheError<T>(key: string, error: unknown): void {
  let entry = cache.get(key) as CacheEntry<T>;
  if (!entry) {
    entry = { listeners: new Set() };
    cache.set(key, entry as CacheEntry<unknown>);
  }
  entry.error = error;
  entry.data = undefined;
  entry.listeners.forEach(listener => listener(undefined, error));
}

export function subscribe<T>(key: string, listener: Listener<T>): void {
  let entry = cache.get(key) as CacheEntry<T>;
  if (!entry) {
    entry = { listeners: new Set() };
    cache.set(key, entry as CacheEntry<unknown>);
  }
  entry.listeners.add(listener);
}

export function unsubscribe<T>(key: string, listener: Listener<T>): void {
  const entry = cache.get(key) as CacheEntry<T>;
  if (entry) {
    entry.listeners.delete(listener);
  }
}