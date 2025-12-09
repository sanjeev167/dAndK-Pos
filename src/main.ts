/**
 * -------------------------------------------------------------------------
 * File: main.ts
 * Author: Sanjeev Kumar
 * Purpose:
 *    This file is the primary entry point for the Angular application.
 *    It is responsible for bootstrapping the root application component
 *    using Angular’s standalone application API.
 *
 *    In dAndK architecture:
 *    - This file triggers the startup process that loads 
 *     1. global providers,
 *     2. global interceptors, 
 *     3. configuration services (Mock/Real), and SSR-safe
 * 
 *      initialization logic defined inside `app.config.ts`.
 *    - No business logic should ever be stored here.
 *
 * Why bootstrapApplication()?
 *    Angular 16+ supports Standalone APIs, removing the need for NgModules.
 *    `bootstrapApplication()`:
 *        - Initializes the root component.
 *        - Applies global configuration from `ApplicationConfig`.
 *        - Registers interceptors, router, and providers.
 *
 * Notes:
 *    - StartupService (if used in dAndK architecture) will execute during app
 *      bootstrap because it is declared in `app.config.ts`.
 *    - Any bootstrap-level errors are caught and logged here.
 * -------------------------------------------------------------------------
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstraps the Angular application using the root AppComponent and the
 * application-level configuration defined in `app.config.ts`.
 *
 * On Success:
 *    - Logs a confirmation message to the console.
 *
 * On Failure:
 *    - Logs the error for troubleshooting.
 */
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log("Angular Application Bootstrapped Successfully"))
  .catch((err) => console.error("❌ Angular Bootstrap Error:", err));
