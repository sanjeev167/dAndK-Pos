/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * RealAuthService handles authentication in production mode.
 * 
 * Key Features:
 * - SSR-safe: does not access localStorage on server.
 * - Supports login, logout, role checks, and persistence in browser.
 * - Compatible with token-based authentication from backend API.
 */

import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { IAuthService } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RealAuthService implements IAuthService {

  /** Currently logged-in user (null if not logged in) */
  private user: User | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  /**
   * Initialize authentication state.
   * SSR-safe: skips localStorage access when running on server.
   *
   * @returns Promise resolving to the current User or null
   */
  async initAuth(): Promise<User | null> {
    try {
      if (!isPlatformBrowser(this.platformId)) {
        console.warn("RealAuthService: initAuth() skipped (SSR mode)");
        this.user = null;
        return null;
      }

      const saved = localStorage.getItem('user');
      this.user = saved ? (JSON.parse(saved) as User) : null;

      console.log("RealAuthService: initAuth() - loaded user", this.user);
      return this.user;

    } catch (error) {
      console.error("RealAuthService: initAuth() error", error);
      this.user = null;
      return null;
    }
  }

  /**
   * Login user with credentials.
   * Stores user in localStorage in browser environment.
   *
   * @param username - user's login name
   * @param password - user's password
   * @returns Promise resolving to the authenticated User
   */
  async login(username: string, password: string): Promise<User> {
    const result = await firstValueFrom(
      this.http.post<User>('/api/auth/login', { username, password })
    );

    this.user = result ?? null;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(this.user));
    }

    console.log("RealAuthService: login() - user logged in", this.user);
    return this.user as User;
  }

  /**
   * Logout user.
   * Removes localStorage entry in browser.
   */
  logout(): void {
    this.user = null;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }

    console.log("RealAuthService: logout()");
  }

  /**
   * Check if current user has a specific role.
   *
   * @param role - role name to check
   * @returns boolean indicating if user has role
   */
  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) ?? false;
  }
}
