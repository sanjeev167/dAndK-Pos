/**
 * Author: Sanjeev Kumar
 * Last Updated: 09-Dec-2025
 *
 * Description:
 * Development-only mock API responder.
 *
 * - Active only when:
 *       environment.production === false
 *       AND environment.useMock === true
 *
 * - Intercepts specific endpoints and returns local JSON data.
 * - Prevents real HTTP calls when backend is unavailable.
 *
 * Angular 19+ Compatible (Functional Interceptor)
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

export const MockBackendInterceptor: HttpInterceptorFn = (req, next) => {

  const mockEnabled = !environment.production && environment.useMock;

  if (!mockEnabled) {
    return next(req); // normal mode
  }

  // 🔹 Mock GET /api/menu
  if (req.url.endsWith('/api/menu')) {
    const menu = [
      { id: 1, label: 'Dashboard', route: '/dashboard', children: [] },
      { id: 2, label: 'Reports', route: '/reports', children: [] },
      { id: 3, label: 'Admin', route: '/admin', children: [] }
    ];

    return of(new HttpResponse({ status: 200, body: menu }));
  }

  // 🔹 Mock POST /api/auth/login
  if (req.url.endsWith('/api/auth/login')) {
    const mockUser = {
      username: 'admin',
      roles: ['ADMIN', 'REPORT_VIEWER'],
      token: 'mock-jwt-admin'
    };

    return of(new HttpResponse({ status: 200, body: mockUser }));
  }

  // Add more mock endpoints as needed…

  return next(req); // fallback
};
