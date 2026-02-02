const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

type FetcherOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

/**
 * Custom fetcher that uses Next.js fetch with the backend URL automatically prepended.
 *
 * @param endpoint - The API endpoint (e.g., "/api/tasks")
 * @param options - Fetch options including method, headers, body, etc.
 * @returns Promise with the parsed JSON response
 *
 * @example
 * // GET request
 * const data = await fetcher("/api/tasks");
 *
 * // POST request with body
 * const result = await fetcher("/api/tasks", {
 *   method: "POST",
 *   body: { title: "New Task" },
 * });
 *
 * // With Next.js revalidation options
 * const data = await fetcher("/api/tasks", {
 *   next: { revalidate: 60 },
 * });
 */
export async function fetcher<T = unknown>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const url = `${BACKEND_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed with status ${response.status}`);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

/**
 * GET request helper
 */
export async function get<T = unknown>(
  endpoint: string,
  options?: Omit<FetcherOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(endpoint, { ...options, method: "GET" });
}

/**
 * POST request helper
 */
export async function post<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetcherOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(endpoint, { ...options, method: "POST", body });
}

/**
 * PUT request helper
 */
export async function put<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetcherOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(endpoint, { ...options, method: "PUT", body });
}

/**
 * PATCH request helper
 */
export async function patch<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetcherOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(endpoint, { ...options, method: "PATCH", body });
}

/**
 * DELETE request helper
 */
export async function del<T = unknown>(
  endpoint: string,
  options?: Omit<FetcherOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(endpoint, { ...options, method: "DELETE" });
}
