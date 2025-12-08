import { InjectionToken } from '@angular/core';
import { ILicenseService } from '../interfaces/license.interface';

export const LicenseServiceToken =
  new InjectionToken<ILicenseService>('LicenseService');
