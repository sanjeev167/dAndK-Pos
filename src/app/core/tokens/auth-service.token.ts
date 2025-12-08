/**
 * Author: Sanjeev Kumar
 * Last Updated: 09-Dec-2025
 *
 * Injection token used for providing AuthService dynamically.
 * Switches between MockAuthService and RealAuthService based on environment.
 */

import { InjectionToken } from '@angular/core';
import { IAuthService } from '../interfaces/auth.interface';

// Strongly typed injection token for the AuthService interface
export const AuthServiceToken = new InjectionToken<IAuthService>('AuthService');
