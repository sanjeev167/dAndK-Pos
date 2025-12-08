/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Contract for Production and Mock Crypto Services.
 * Both services MUST implement these methods so that the StartupService
 * can initialize encryption before any HTTP request occurs.
 *
 * Notes:
 * - `init()` prepares AES keys or key-exchange logic (session-specific).
 * - `encrypt()` encrypts outbound payloads to backend.
 * - `decrypt()` decrypts backend responses.
 *
 * IMPORTANT:
 * This interface is kept intentionally minimal to preserve the previously
 * tested AES encryption/decryption workflow.
 */

export interface ICryptoService {

  /**
   * Initializes crypto layer before the app starts.
   * Production:
   *    - Fetches server public key OR AES key exchange request.
   * Mock:
   *    - Generates a dummy AES key.
   */
  init(): Promise<void>;

  /**
   * Encrypts a message using established AES session keys.
   */
  encrypt(message: any): Promise<any>;

  /**
   * Decrypts an incoming encrypted payload.
   */
  decrypt(data: any): Promise<any>;
}
