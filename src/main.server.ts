/**
 * -------------------------------------------------------------------------
 * File: main.server.ts
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Purpose:
 *    This file is the Server-Side Rendering (SSR) bootstrap entry point
 *    for the Angular application when running inside a Node.js environment.
 *
 *    Angular 19 introduced improvements in the standalone bootstrapping model,
 *    but the SSR runtime still requires a special bootstrapping flow that
 *    differs from the browser.
 *
 * Why This File Exists:
 *    - When Angular runs on the server, it does NOT bootstrap automatically
 *      like in the browser (`main.ts`). Instead, the SSR engine calls this
 *      function to create a server-side Angular instance for each request.
 *
 *    - Some SSR runtimes (Angular Universal, Vite-SSR, Cloud Functions adapters)
 *      inject request-specific data (cookies, headers, URLs, DI scopes) using:
 *          BootstrapContext
 *
 *    - Because of this, Angular must be bootstrapped using:
 *          bootstrapApplication(AppComponent, config, context)
 *
 *    - Omitting the context results in runtime failure:
 *          NG0401: Missing Platform
 *
 * What This File Does:
 *    ✔ Receives the SSR execution context  
 *    ✔ Bootstraps the Angular application for server-side execution  
 *    ✔ Delegates all SSR provider configuration to `app.config.server.ts`  
 *
 * What This File Does NOT Do:
 *    ✖ No business logic  
 *    ✖ No interceptors or providers (those belong in config files)  
 *    ✖ No Express server setup (handled in server.ts)  
 *
 * Important in dAndK Architecture:
 *    - Maintains separation of concerns:  
 *        *Browser bootstrap → main.ts*  
 *        *Server bootstrap → main.server.ts*  
 *    - Ensures SSR-safe DI initialization (Routing, CryptoService, APIs)  
 *    - Supports SSR-safe functional interceptors  
 *
 * -------------------------------------------------------------------------
 */

import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * -------------------------------------------------------------------------
 * bootstrap()
 *
 * A factory function required by Angular SSR.
 *
 * The SSR runtime (like @angular/ssr, Express engine, or cloud adapter)
 * calls this method for each incoming request. The BootstrapContext contains:
 *    - request URL
 *    - cookies
 *    - headers
 *    - DI-scoped data for SSR interceptors
 *
 * We pass:
 *    - Root component (AppComponent)
 *    - Server-side configuration (config)
 *    - SSR request context (context)
 * -------------------------------------------------------------------------
 */
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

/**
 * Export as default because SSR loaders expect the default export
 * to be the bootstrap handler.
 */
export default bootstrap;
