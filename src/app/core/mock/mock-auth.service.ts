/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Mock implementation of IAuthService for development mode.
 * Provides dummy login, user roles, and token without requiring a backend.
 *
 * Key Points:
 * - Only active when `environment.useMock = true`.
 * - Useful for testing authentication and role-based UI logic.
 * - Compatible with StartupService for initialization.
 */

import { Injectable } from "@angular/core";
import { IAuthService } from "../interfaces/auth.interface";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class MockAuthService implements IAuthService {

  /** 
   * Current user state.
   * Null if logged out. 
   */
  private user: User | null = {
    username: 'admin',
    roles: ['ADMIN', 'REPORT_VIEWER'],
    token: 'dummyJWT_admin'
  };

  /**
   * Initialize authentication.
   * For mock, simply returns the current user.
   * @returns Promise<User | null>
   */
  async initAuth(): Promise<User | null> {
    console.log("MockAuthService: initAuth()");
    return this.user;
  }

  /**
   * Mock login method.
   * Sets user with dummy token and roles.
   * @param username - Provided username (used in token)
   * @param password - Ignored in mock
   * @returns Promise<User>
   */
  async login(username: string, password: string): Promise<User> {
    console.log(`MockAuthService: login(${username})`);

    // Assign a mock user dynamically based on username
    this.user = {
      username,
      roles: ['ADMIN', 'REPORT_VIEWER'], // default roles for testing
      token: `dummyJWT_${username}`       // dummy token
    };

    return this.user;
  }

  /**
   * Mock logout.
   * Clears the current user.
   */
  logout(): void {
    console.log("MockAuthService: logout()");
    this.user = null;
  }

  /**
   * Checks if the current user has a specific role.
   * Returns false if user is null or role not present.
   * @param role - Role name to check
   * @returns boolean
   */
  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) ?? false;
  }
}
