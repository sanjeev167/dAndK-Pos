/**
 * Author: Sanjeev Kumar
 * Last Updated: 09-Dec-2025
 *
 * Description:
 * Interceptor that attaches authentication token (JWT) to all outgoing
 * API requests. Uses AuthService to retrieve the current user.
 *
 * Angular 19+ Compatible (Functional Interceptor)
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthServiceToken } from '../tokens/auth-service.token';
import { IAuthService } from '../interfaces/auth.interface';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject<IAuthService>(AuthServiceToken);
  const user = (authService as any)?.getCurrentUser?.() ?? null;

  // No user → no token → pass as is
  if (!user || !user.token) {
    return next(req);
  }

  // Attach Authorization header
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${user.token}`
    }
  });

  return next(cloned);
};
