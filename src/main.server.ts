/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Angular 19 SSR Entry Point
 * ---------------------------
 * IMPORTANT:
 * Angular 19 has simplified client-side bootstrapping, but many SSR runtimes
 * (including Vite-based SSR builders and Angular Universal adapters)
 * STILL require passing a `BootstrapContext` when bootstrapping on the server.
 *
 * WHY THIS FILE USES `BootstrapContext`:
 * - SSR engines inject request-scoped data using BootstrapContext.
 * - Removing it causes Angular SSR to fail with:
 *       NG0401: Missing Platform
 * - Therefore, this entry point MUST keep the 3-argument signature:
 *       bootstrapApplication(AppComponent, config, context)
 *
 * NOTE:
 * - All SSR providers are still configured inside `app.config.server.ts`.
 * - This file only handles the SSR bootstrap handshake.
 */

import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, config, context);

export default bootstrap;
