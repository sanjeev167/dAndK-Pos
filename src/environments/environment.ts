/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Development environment configuration.
 *
 * This file controls:
 *  - Whether the application runs in MOCK mode or REAL-BACKEND mode
 *  - API endpoint routing
 *  - Security and hybrid encryption configuration
 *
 * NOTE:
 * This architecture is designed so the *same* Angular codebase works:
 *   ✔ With NO backend (mock mode)
 *   ✔ With real backend (production mode)
 *   ✔ With SSR rendering
 */

export const environment = {
  /**
   * Angular build flag — do not modify.
   * true  = production build
   * false = development build (ng serve)
   */
  production: false,

  /**
   * MASTER SWITCH for choosing service mode.
   * ------------------------------------------------------------
   * If true:
   *    All HTTP calls are intercepted by MockBackendInterceptor.
   *    All Auth/Crypto/Menu services come from app/core/mock/.
   *    No backend is required.
   *
   * If false:
   *    Real Auth/Crypto/Menu services are used.
   *    HTTP is forwarded to backend API (via proxy.conf.json).
   */
  useMock: true,

  /**
   * Real backend API base URL (used only if useMock=false).
   * Example: Java Spring Boot server running on port 8080.
   *
   * NOTE:
   * You must configure Angular proxy (proxy.conf.json) to map
   *    /api → http://localhost:8080
   * during development when useMock = false.
   */
  apiBaseUrl: 'http://localhost:8080/api',

  /**
   * Global security & cryptography configuration.
   * Hybrid RSA + AES system (extensible in future).
   * RealCryptoService / MockCryptoService both respect this.
   */
  security: {
    /**
     * Enables hybrid encryption:
     *  - AES per request or per session
     *  - RSA public key encryption for AES key
     */
    enableHybridCrypto: true,

    /**
     * AES key lifetime strategy.
     *   "request" = new AES key for every encrypted HTTP call.
     *   "session" = AES key generated once during StartupService.
     */
    aesStrategy: 'request' as 'request' | 'session'
  }
};
