import { Observable } from 'rxjs';

import { EnvironmentServerName } from '@models/environment';

/** Represents the caching options for an HTTP response. */
export interface HttpCacheOptions {
  /** If specified, provides the cache key to use to cache the HTTP response. By default, the endpoint value is used. */
  key?: string;

  /** The group key to assign to the cache entry. */
  groupKey?: string;

  // eslint-disable-next-line max-len
  /** The time-to-live (in number of seconds) to use for the cache entry, or zero for infinite cache. If not specified, the system default TTL will be used (24 hours). */
  ttl?: number;

  /** Indicates that if the current request is cached, it should be reloaded. If the device is off-line, this value is ignored. */
  bypass?: boolean;
}

export enum HttpCacheTTL {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Infinite = 0,
}

/** Represents a delegate for handling HTTP requests. */
export interface HttpDelegate {
  /**
   * Performs an HTTP GET to the specified API endpoint and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP GET for.
   * @param cache A value containing caching options. If not specified, caching will not be performed for the API request.
   */
  get<T>(
    endpoint: string | HttpEndpointOptions,
    cache?: HttpCacheOptions
  ): Observable<HttpEndpointResponse<T>>;

  /**
   * Performs an HTTP POST to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP POST for.
   * @param body The content to send with the HTTP POST.
   */
  post<T>(
    endpoint: string | HttpEndpointOptions,
    body?: any
  ): Observable<HttpEndpointResponse<T>>;

  /**
   * Performs an HTTP PUT to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP PUT for.
   * @param body The content to send with the HTTP PUT.
   */
  put<T>(
    endpoint: string | HttpEndpointOptions,
    body?: any
  ): Observable<HttpEndpointResponse<T>>;
}

/** Represents the options for accessing an API endpoint. */
export interface HttpEndpointOptions {
  /** The API server to use. */
  server?: EnvironmentServerName;

  /** The API endpoint to access. */
  endpoint: string;

  /** Additional HTTP headers to include in the API request. */
  headers?: { [name: string]: string | string[] };

  /** Adding query filter */
  params?: { [key: string]: string | number | boolean };
}

/** Represents an HTTP response. */
export interface HttpEndpointResponse<T> {
  /** The status number of the response. */
  status: number;

  /** The headers of the response. */
  headers: { [name: string]: string };

  /** The URL of the response. This property will be the final URL obtained after any redirects. */
  url: string;

  /** The body of the response. This property usually exists when a promise returned by a request method resolves. */
  body?: T;

  /** Error response from the server. This property usually exists when a promise returned by a request method rejects. */
  error?: any;
}

export interface HttpHeadersPagination {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  previousPageLink: string;
  nextPageLink: string;
}
