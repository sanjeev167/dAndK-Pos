/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Mock MenuService for development environment.
 * Provides a dummy navigation menu for UI testing and
 * role-based access validation.
 *
 * Key Points:
 * - Only used when `environment.useMock = true`.
 * - Implements the `IMenuService` interface.
 * - Returns a predictable menu structure to allow
 *   components to render menus without a backend.
 * - Supports nested children (currently empty arrays for demo).
 */

import { Injectable } from "@angular/core";
import { IMenuService } from "../interfaces/menu.interface";

@Injectable({
  providedIn: 'root'
})
export class MockMenuService implements IMenuService {

  /**
   * Loads dummy menu items for development
   * 
   * @returns Promise resolving to an array of menu items
   */
  async loadMenu(): Promise<any[]> {
    console.log("MockMenuService: loadMenu() called - returning dummy menu");

    return [
      { id: 1, label: 'Dashboard', route: '/dashboard', children: [] },
      { id: 2, label: 'Reports', route: '/reports', children: [] },
      { id: 3, label: 'Admin', route: '/admin', children: [] },
    ];
  }
}
