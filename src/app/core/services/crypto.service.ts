/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Real CryptoService handles encryption/decryption in production.
 * - Uses AES-style dummy encryption for now (can extend to WebCrypto API).
 * - Fully SSR-safe: avoids browser crypto APIs on server.
 * - Compatible with hybrid RSA–AES workflows for secure messaging.
 */

import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ICryptoService } from "../interfaces/crypto.interface";

@Injectable({
  providedIn: 'root'
})
export class RealCryptoService implements ICryptoService {

  /** Session-specific AES key (dummy for SSR) */
  private sessionKey: Uint8Array | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Initialize crypto service.
   * - Browser: generates random session key.
   * - SSR: generates a predictable fallback key.
   */
  async init() {
    if (isPlatformBrowser(this.platformId)) {
      this.sessionKey = crypto.getRandomValues(new Uint8Array(16));
      console.log(
        "RealCryptoService: init() - sessionKey generated",
        btoa(String.fromCharCode(...this.sessionKey))
      );
    } else {
      this.sessionKey = new Uint8Array(16).fill(1);
      console.warn("RealCryptoService: init() skipped real crypto (SSR mode)");
    }
  }

  /**
   * Encrypt a payload.
   * - Uses dummy AES-style logic (concatenate + base64) for now.
   * - Ensures session key exists before encryption.
   *
   * @param message - payload object
   * @returns { encryptedKey, encryptedData }
   */
  async encrypt(message: any) {
    if (!this.sessionKey) {
      await this.init();
    }

    const encoded = new TextEncoder().encode(JSON.stringify(message));
    const key = this.sessionKey!;

    const encryptedData = this.safeBtoa(encoded);
    const encryptedKey = this.safeBtoa(key);

    return { encryptedKey, encryptedData };
  }

  /**
   * Decrypt a payload.
   *
   * @param data - { encryptedKey, encryptedData }
   * @returns decrypted object
   */
  async decrypt(data: any) {
    const decoded = this.safeAtob(data.encryptedData);
    return JSON.parse(new TextDecoder().decode(decoded));
  }

  /**
   * SSR-safe base64 encoder
   */
  private safeBtoa(bytes: Uint8Array): string {
    if (isPlatformBrowser(this.platformId)) {
      return btoa(String.fromCharCode(...bytes));
    }
    return Buffer.from(bytes).toString("base64");
  }

  /**
   * SSR-safe base64 decoder
   */
  private safeAtob(base64: string): Uint8Array {
    if (isPlatformBrowser(this.platformId)) {
      const decoded = atob(base64);
      return new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    }
    return new Uint8Array(Buffer.from(base64, "base64"));
  }
}
