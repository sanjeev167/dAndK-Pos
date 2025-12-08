export interface ILicenseService {
  getLicenseId(): string | null;

  // For future use (optional extensions):
  isOfflineLicense(): boolean;
  validateLicense(): Promise<boolean>;
}
