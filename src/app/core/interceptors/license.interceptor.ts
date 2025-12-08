import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LicenseServiceToken } from '../tokens/license-service.token';
import { ILicenseService } from '../interfaces/license.interface';

export const LicenseInterceptor: HttpInterceptorFn = (req, next) => {

  const licenseService = inject<ILicenseService>(LicenseServiceToken);
  const licenseId = licenseService.getLicenseId() || 'NO_LICENSE';

  const cloned = req.clone({
    setHeaders: {
      'X-License-ID': licenseId
    }
  });

  return next(cloned);
};
