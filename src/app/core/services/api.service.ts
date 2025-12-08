/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * -------------------------------------------------------------------
 * Centralized API service used across the application.
 *
 * Responsibilities:
 * - Build full URLs using environment.apiBaseUrl.
 * - Provide convenient typed wrappers: GET, POST, PUT, DELETE.
 * - SSR-safe (does not access browser-only APIs).
 * - Encryption, token attachment, license checks, etc. are handled
 *   by interceptors (token.interceptor, encryption.interceptor).
 * - Works seamlessly with mock mode (`environment.useMock = true`).
 *
 * NOTE:
 * This service must stay lightweight and only orchestrate requests.
 * All security, encryption, and preprocessing must remain outside
 * to avoid coupling and ensure SSR compatibility.
 * -------------------------------------------------------------------
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  /**
   * Backend base URL.  
   * Example: https://api.dandk.in/api
   */
  private readonly baseUrl = environment.apiBaseUrl;

  constructor() {}

  /**
   * Safely constructs the full URL.
   */
  private buildUrl(endpoint: string): string {
    // Ensures no accidental double slashes
    return `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  /**
   * GET request
   * @param endpoint API endpoint relative to baseUrl
   * @param options Optional headers, params, etc.
   */
  get<T>(endpoint: string, options?: {
    headers?: HttpHeaders;
    params?: HttpParams | { [param: string]: string | number | boolean };
  }): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), options);
  }

  /**
   * POST request
   * @param endpoint API endpoint relative to baseUrl
   * @param body Payload to send
   * @param options Optional headers, params, etc.
   */
  post<T>(endpoint: string, body: any, options?: {
    headers?: HttpHeaders;
    params?: HttpParams | { [param: string]: string | number | boolean };
  }): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, options);
  }

  /**
   * PUT request
   * @param endpoint API endpoint relative to baseUrl
   * @param body Payload to send
   * @param options Optional headers, params, etc.
   */
  put<T>(endpoint: string, body: any, options?: {
    headers?: HttpHeaders;
    params?: HttpParams | { [param: string]: string | number | boolean };
  }): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body, options);
  }

  /**
   * DELETE request
   * @param endpoint API endpoint relative to baseUrl
   * @param options Optional headers, params, etc.
   */
  delete<T>(endpoint: string, options?: {
    headers?: HttpHeaders;
    params?: HttpParams | { [param: string]: string | number | boolean };
  }): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), options);
  }
}
