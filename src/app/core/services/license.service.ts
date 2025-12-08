import { Injectable } from '@angular/core';
import { ILicenseService } from '../interfaces/license.interface';

@Injectable({
  providedIn: 'root'
})
export class RealLicenseService implements ILicenseService {

  private LOCAL_KEY = 'APP_LICENSE_ID';

  constructor() {}

  getLicenseId(): string | null {
    return localStorage.getItem(this.LOCAL_KEY);
  }

  isOfflineLicense(): boolean {
    return localStorage.getItem('APP_LICENSE_MODE') === 'offline';
  }

  async validateLicense(): Promise<boolean> {

    const licenseId = this.getLicenseId();
    if (!licenseId) return false;

    if (this.isOfflineLicense()) {
      // Offline license = validated locally
      return true;
    }

    // Validate online (backend API)
    try {
      const response = await fetch('/api/license/validate', {
        method: 'POST',
        body: JSON.stringify({ licenseId }),
        headers: { 'Content-Type': 'application/json' }
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
