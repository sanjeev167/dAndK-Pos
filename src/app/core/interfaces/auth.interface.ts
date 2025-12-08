/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Defines the contract for both MOCK and REAL Authentication Services.
 * All authentication-related operations MUST strictly follow this interface.
 *
 * Notes:
 * - Production implementation will use real backend authentication.
 * - Mock implementation will simulate login and roles for development/testing.
 */

export interface IAuthService {

  /**
   * Initializes authentication state at application startup.
   * Should restore user session if a token exists in storage.
   */
  initAuth(): Promise<any>;

  /**
   * Attempts to log in a user using supplied credentials.
   * Production:
   *   - Sends credentials to backend.
   *   - Saves returned JWT + user roles.
   * Mock:
   *   - Returns dummy user with predetermined roles.
   */
  login(username: string, password: string): Promise<any>;

  /**
   * Clears user session and authentication token.
   */
  logout(): void;

  /**
   * Returns true if the currently authenticated user has the specified role.
   */
  hasRole(role: string): boolean;
}
