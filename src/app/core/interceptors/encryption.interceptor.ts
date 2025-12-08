/**
 * ------------------------------------------------------------------------
 *  EncryptionInterceptor (Angular 19+)
 * ------------------------------------------------------------------------
 *  Author: Sanjeev Kumar
 *  Last Updated: 09-Dec-2025
 *
 *  PURPOSE:
 *  --------
 *  - Transparently encrypts outgoing HTTP request bodies.
 *  - Decrypts encrypted server responses.
 *  - Fully compatible with Angular 19 functional interceptors.
 *  - SSR-safe: skips all encryption on the server.
 *
 *  USAGE:
 *  ------
 *    provideHttpClient(
 *      withInterceptors([encryptionInterceptor])
 *    )
 *
 * ------------------------------------------------------------------------
 *  HOW IT WORKS:
 *  -------------
 *  1️⃣ SSR CHECK
 *      - If running on server → skip encryption entirely.
 *      - Check: typeof window === 'undefined'
 *
 *  2️⃣ OUTGOING REQUEST ENCRYPTION
 *      - Only encrypts requests with body (POST, PUT, PATCH).
 *      - Skips GET/DELETE requests (no body to encrypt).
 *      - Uses RealCryptoService.encrypt() to generate:
 *          { encryptedKey: "...", encryptedData: "..." }
 *      - Adds header: 'X-Encrypted: 1'
 *
 *  3️⃣ INCOMING RESPONSE DECRYPTION
 *      - Only decrypts if server sends: { encryptedData: "..." }
 *      - Uses RealCryptoService.decrypt() to obtain original payload.
 *      - Wraps decryption in try/catch → app never crashes.
 *
 *  4️⃣ SSR / Browser Safety
 *      - SSR: window undefined → skips encryption.
 *      - Browser: full encryption/decryption enabled.
 *
 * ------------------------------------------------------------------------
 */

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RealCryptoService } from '../services/crypto.service';
import { map, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

/**
 * Defines the structure of an encrypted payload.
 */
interface EncryptedPayload {
  encryptedKey: string;
  encryptedData: string;
}

/**
 * Functional HTTP interceptor for Angular 19+.
 * Encrypts outgoing request bodies and decrypts encrypted responses.
 */
export const encryptionInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  // -----------------------------
  // 1️⃣ SSR CHECK
  // -----------------------------
  const isServer = typeof window === 'undefined';
  if (isServer) return next(req); // skip encryption on server

  // -----------------------------
  // 2️⃣ Inject Crypto Service
  // -----------------------------
  const cryptoService = inject<RealCryptoService>(RealCryptoService);

  // -----------------------------
  // 3️⃣ Skip requests that don't require encryption
  // -----------------------------
  if (req.method === 'GET' || req.method === 'DELETE') return next(req);
  if (!req.body) return next(req);

  // -----------------------------
  // 4️⃣ Encrypt outgoing request
  // -----------------------------
  return of(null).pipe(
    switchMap(async () => {
      const encrypted: EncryptedPayload = await cryptoService.encrypt(req.body);

      // Merge existing headers safely
      const existingHeaders: Record<string, string> = {};
      req.headers.keys().forEach(key => existingHeaders[key] = req.headers.get(key)!);

      const encryptedReq = req.clone({
        body: encrypted,
        setHeaders: {
          ...existingHeaders,
          'X-Encrypted': '1'
        }
      });

      return encryptedReq;
    }),

    // -----------------------------
    // 5️⃣ Forward request and handle response
    // -----------------------------
    switchMap((encryptedReq: HttpRequest<any>) =>
      next(encryptedReq).pipe(
        switchMap(event => {

          // Only handle actual HttpResponse events
          if (event instanceof HttpResponse) {
            const body = event.body as EncryptedPayload | any;

            // Only decrypt if body contains encryptedData
            if (body?.encryptedData) {
              return from(decryptResponse(cryptoService, body)).pipe(
                map(decrypted => event.clone({ body: decrypted }))
              );
            }
          }

          // Pass through unchanged if no decryption needed
          return of(event);
        })
      )
    )
  );
};

/**
 * ------------------------------------------------------------------------
 * Helper: decryptResponse()
 * ------------------------------------------------------------------------
 * Safely decrypts a server response using RealCryptoService.
 * If decryption fails, returns the raw encrypted payload.
 *
 * @param crypto - RealCryptoService instance
 * @param body   - Server response body
 * @returns      - Promise resolving to decrypted object or raw payload
 * ------------------------------------------------------------------------
 */
async function decryptResponse(crypto: RealCryptoService, body: EncryptedPayload): Promise<any> {
  try {
    return await crypto.decrypt(body);
  } catch (err) {
    console.error("EncryptionInterceptor: Response decryption failed", err);
    return body;  // fallback: return raw encrypted data
  }
}
