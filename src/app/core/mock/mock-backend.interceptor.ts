/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Mock backend interceptor (Functional)
 * Returns dummy responses for development/testing.
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export const MockBackendInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("[MockBackend] Intercepted:", req.url);

  // ---- Mock Login API ----
  // Real service calls: /api/auth/login
  if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          username: 'admin',
          roles: ['ADMIN', 'REPORT_VIEWER'],
          token: 'mock-token'
        }
      })
    );
  }

  // ---- Mock Menu API ----
  if (req.url.endsWith('/api/menu') && req.method === 'GET') {
    const dummyMenu = [
      { id: 1, label: 'Dashboard', route: '/dashboard', children: [] },
      { id: 2, label: 'Reports', route: '/reports', children: [] },
      { id: 3, label: 'Admin', route: '/admin', children: [] },
    ];

    return of(
      new HttpResponse({
        status: 200,
        body: dummyMenu
      })
    );
  }

  // ---- Pass Through Others ----
  return next(req);
};
