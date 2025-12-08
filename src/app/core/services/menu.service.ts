/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Real MenuService for production.
 * - Fetches menu from backend API.
 * - SSR-safe: skips API calls on server to avoid hang.
 * - Guarantees a valid array is returned even on errors.
 */

import { HttpClient } from "@angular/common/http";
import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { IMenuService } from "../interfaces/menu.interface";
import { isPlatformServer } from "@angular/common";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RealMenuService implements IMenuService {

  /** Inject PLATFORM_ID for SSR detection */
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  /**
   * Load menu from backend API.
   * - SSR-safe: skips API call on server.
   * - Always returns array, even if backend fails.
   *
   * @returns Promise resolving to array of menu items
   */
  async loadMenu(): Promise<any[]> {

    // ⛔ Skip HTTP call during SSR
    if (isPlatformServer(this.platformId)) {
      console.log("RealMenuService: loadMenu() skipped (SSR mode)");
      return [];
    }

    try {
      const menu = await firstValueFrom(
        this.http.get<any[]>('/api/menu')
      );

      return menu ?? [];  // Always return valid array
    } catch (err) {
      console.error('RealMenuService: Failed to load menu', err);
      return [];
    }
  }
}
