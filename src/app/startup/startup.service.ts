/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * StartupService orchestrates application initialization in a structured sequence:
 *
 * Sequence:
 *   1️⃣ CryptoService → sets up session keys or encryption environment
 *   2️⃣ AuthService → initializes user authentication, roles, and token
 *   3️⃣ MenuService → loads navigation/menu structure
 *
 * Features:
 *   - Works with both Mock and Real services via dependency injection
 *   - Provides SSR-safe initialization (services like RealAuthService handle platform checks)
 *   - Exposes a `ready$` observable so components can react to app readiness
 */

import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICryptoService } from '../core/interfaces/crypto.interface';
import { IAuthService } from '../core/interfaces/auth.interface';
import { IMenuService } from '../core/interfaces/menu.interface';

@Injectable({ providedIn: 'root' })
export class StartupService {

  /**
   * Observable signaling when app initialization is complete.
   * Emits an object { user, menu } once Crypto, Auth, and Menu services are ready.
   */
  public ready$ = new BehaviorSubject<{ user: any, menu: any[] } | null>(null);

  /**
   * Constructor injects services via Angular's DI tokens.
   * This allows switching easily between mock and real services
   * depending on the environment configuration.
   *
   * @param crypto - Handles encryption/decryption
   * @param auth - Manages user authentication and roles
   * @param menu - Loads application menu/navigation structure
   */
  constructor(
    @Inject('CryptoService') private crypto: ICryptoService,
    @Inject('AuthService') private auth: IAuthService,
    @Inject('MenuService') private menu: IMenuService
  ) {}

  /**
   * Initialize the application in a sequential and predictable order:
   * 1. CryptoService → sets session keys
   * 2. AuthService → loads logged-in user and roles
   * 3. MenuService → loads navigation menu
   *
   * Emits the `ready$` observable for components to react after initialization.
   *
   * @returns Promise resolving to an object containing `user` and `menu`
   */
  async init(): Promise<{ user: any, menu: any[] }> {
    console.log("StartupService: crypto init");
    await this.crypto.init(); // initialize encryption/session keys

    console.log("StartupService: auth init");
    const user = await this.auth.initAuth(); // fetch user info, SSR-safe

    console.log("StartupService: menu load");
    const menu = await this.menu.loadMenu(); // fetch menu items

    console.log("StartupService: initialization complete");

    // Emit ready state for subscribers (e.g., AppComponent)
    this.ready$.next({ user, menu });

    return { user, menu };
  }
}
