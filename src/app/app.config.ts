/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Angular 19+ Application Configuration
 * --------------------------------------
 * This file defines all global providers used by the application,
 * including SSR-safe HttpClient, mock services, runtime initialization,
 * and environment-based dependency injection.
 *
 * Key Responsibilities:
 * ---------------------------------------------------------------
 * 1️⃣ Provide an SSR-compatible HttpClient using the Fetch API.
 * 2️⃣ Use mock backend interceptors when `environment.useMock = true`.
 * 3️⃣ Run StartupService.init() BEFORE app bootstrap using APP_INITIALIZER.
 * 4️⃣ Automatically switch between:
 *       • MockAuthService   ↔ RealAuthService
 *       • MockCryptoService ↔ RealCryptoService
 *       • MockMenuService   ↔ RealMenuService
 *    depending on the environment.
 *
 * Architecture Advantages:
 * ---------------------------------------------------------------
 * ✔ Same codebase runs flawlessly in:
 *      • Development mode with mock backend (no server needed)
 *      • Production mode using real backend APIs
 *      • Server-Side Rendering (SSR) environment
 *
 * ✔ Interceptors, Auth, Crypto, and Menu services are environment-aware.
 *
 * ✔ Completely aligned with Angular 17+ / 18 / 19 application config pattern.
 *
 * NOTE:
 * - ALL SSR-specific providers should be placed here or in the
 *   server-specific config file (app.config.server.ts).
 * - bootstrapApplication() MUST receive only (AppComponent, config)
 *   — no third argument is used in Angular 17+.
 */

import { APP_INITIALIZER } from '@angular/core';
import { StartupService } from './startup/startup.service';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';

// ---------------------------
// MOCK SERVICES (for development mode)
// ---------------------------
import { MockAuthService } from './core/mock/mock-auth.service';
import { MockCryptoService } from './core/mock/mock-crypto.service';
import { MockMenuService } from './core/mock/mock-menu.service';

// ---------------------------
// REAL SERVICES (for production mode)
// ---------------------------
import { RealAuthService } from './core/services/auth.service';
import { RealCryptoService } from './core/services/crypto.service';
import { RealMenuService } from './core/services/menu.service';

// ---------------------------
// MOCK BACKEND INTERCEPTOR
// ---------------------------
import { MockBackendInterceptor } from './core/mock/mock-backend.interceptor';

export const appConfig = {
  providers: [

    // ---------------------------------------------------------
    // HTTP CLIENT (SSR-safe)
    // ---------------------------------------------------------
    provideHttpClient(
      withFetch(),  // required for SSR & modern Angular
      withInterceptors(environment.useMock ? [MockBackendInterceptor] : [])
    ),

    // ---------------------------------------------------------
    // APP INITIALIZER: Bootstraps startup logic
    // ---------------------------------------------------------
    {
      provide: APP_INITIALIZER,
      useFactory: (startup: StartupService) => () => startup.init(),
      deps: [StartupService],
      multi: true
    },

    // ---------------------------------------------------------
    // AUTH SERVICE
    // ---------------------------------------------------------
    {
      provide: 'AuthService',
      useClass: environment.useMock ? MockAuthService : RealAuthService
    },

    // ---------------------------------------------------------
    // CRYPTO SERVICE
    // ---------------------------------------------------------
    {
      provide: 'CryptoService',
      useClass: environment.useMock ? MockCryptoService : RealCryptoService
    },

    // ---------------------------------------------------------
    // MENU SERVICE
    // ---------------------------------------------------------
    {
      provide: 'MenuService',
      useClass: environment.useMock ? MockMenuService : RealMenuService
    }
  ]
};
