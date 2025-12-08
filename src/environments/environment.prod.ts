/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Production environment configuration.
 *
 * This configuration enforces the following:
 *   ✔ Real backend services only (no mocks)
 *   ✔ Secure hybrid RSA + AES encryption
 *   ✔ AES key strategy suitable for production
 *   ✔ API requests expected to go through a reverse proxy (e.g., Nginx)
 *
 * This file complements environment.ts (development) and ensures the
 * application architecture works seamlessly with production APIs.
 */

export const environment = {
  /**
   * Angular production build flag
   */
  production: true,

  /**
   * MASTER SWITCH for mock/real mode
   * ------------------------------------------------------------
   * false → Use real services only (app/core/services/*)
   * true  → Never set to true in production!
   */
  useMock: false,

  /**
   * Backend API base URL.
   * Typically proxied by web server (Nginx/Apache) to the API.
   */
  apiBaseUrl: '/api',

  /**
   * Global security & cryptography configuration.
   */
  security: {
    /**
     * Always enable hybrid RSA + AES encryption in production
     */
    enableHybridCrypto: true,

    /**
     * AES key lifetime strategy for production:
     *   - "request" = new AES key per API request (recommended)
     *   - "session" = one AES key per session (less secure)
     */
    aesStrategy: 'request' as 'request' | 'session'
  }
};
