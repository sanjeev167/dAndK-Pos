/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Mock CryptoService for development environment.
 * Provides dummy encryption/decryption to simulate
 * real CryptoService behavior without using real keys.
 *
 * Key Points:
 * - Used only when `environment.useMock = true`.
 * - Preserves the same interface as RealCryptoService (ICryptoService).
 * - Enables testing of encryption/decryption dependent features.
 */

import { Injectable } from "@angular/core";
import { ICryptoService } from "../interfaces/crypto.interface";

@Injectable({
  providedIn: 'root'
})
export class MockCryptoService implements ICryptoService {

  /**
   * Mock initialization.
   * No real session key is generated.
   */
  async init(): Promise<void> {
    console.log("MockCryptoService: init() called");
  }

  /**
   * Encrypts a message using a dummy approach.
   * This is sufficient for development/testing purposes.
   * 
   * @param message - The payload to encrypt
   * @returns Promise resolving to an object containing:
   *          - encryptedKey: dummy key string
   *          - encryptedData: base64 encoded JSON string
   */
  async encrypt(message: any): Promise<{ encryptedKey: string; encryptedData: string }> {
    const dummyKey = 'dummyServerKey'; // visible in dev logs for tracing
    return {
      encryptedKey: btoa(dummyKey),
      encryptedData: btoa(JSON.stringify(message))
    };
  }

  /**
   * Decrypts previously "encrypted" data.
   * Simply decodes base64 string back to JSON.
   * 
   * @param data - object containing encryptedKey and encryptedData
   * @returns Promise resolving to the original message object
   */
  async decrypt(data: { encryptedKey: string; encryptedData: string }): Promise<any> {
    return JSON.parse(atob(data.encryptedData));
  }
}
