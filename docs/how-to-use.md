

# How to Use `useQuery` and `useMutation`

This package provides lightweight, subscription-based React hooks for managing remote data fetching and mutations with internal caching.

---

## `useQuery`

The `useQuery` hook fetches and caches data by key, reuses it across components, and updates automatically when refreshed.

### Example

```tsx
import { useQuery } from "@plasius/react-query";
import { authorizedFetch } from "@plasius/auth";

const { data, error, isLoading, refetch } = useQuery("settings", () =>
  authorizedFetch("/settings").then(res => res.json())
);
```

### Parameters

| Name     | Type                     | Description                     |
|----------|--------------------------|---------------------------------|
| `key`    | `string`                 | Unique cache key                |
| `fetcher`| `() => Promise<T>`       | Function to fetch the data      |

### Returns

| Property     | Type            | Description                             |
|--------------|------------------|-----------------------------------------|
| `data`       | `T \| undefined` | The fetched data                        |
| `error`      | `unknown`        | Any error encountered                   |
| `isLoading`  | `boolean`        | Whether the query is currently loading  |
| `refetch`    | `() => void`     | Function to manually refetch data       |

---

## `useMutation`

The `useMutation` hook performs async actions like POST, PUT, or DELETE requests.

### Example

```tsx
import { useMutation } from "@plasius/react-query";
import { authorizedFetch } from "@plasius/auth";

const { mutate, data, error, isLoading } = useMutation(
  (payload: SettingsState) =>
    authorizedFetch("/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  {
    onSuccess: () => console.log("Saved!"),
    onError: (err) => console.error("Error saving:", err),
  }
);
```

### Returns

| Property     | Type                     | Description                              |
|--------------|--------------------------|------------------------------------------|
| `mutate`     | `(variables: T) => void` | Triggers the mutation                    |
| `data`       | `TData \| undefined`     | Result returned from the mutation        |
| `error`      | `TError \| undefined`    | Error returned from the mutation         |
| `isLoading`  | `boolean`                | Whether the mutation is currently active |

---

## Features

- Shared cache across components
- Real-time cache updates via subscriptions
- Manual refetching
- Inline success and error handlers
- Built-in loading and error tracking

---

## Future Ideas

- Add support for stale time
- Add global invalidation
- Add suspense or streaming support