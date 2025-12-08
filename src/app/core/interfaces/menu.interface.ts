/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Contract for Production and Mock Menu Services.
 * Any implementation of this interface should provide a method to load
 * menu items for the current user/session.
 *
 * Notes:
 * - `loadMenu()` fetches menu from backend or provides mock menu in dev.
 * - The returned menu should be in flat or tree format.
 */

export interface IMenuService {

  /**
   * Loads menu items for the current session/user.
   * @returns A Promise resolving to an array of menu objects.
   */
  loadMenu(): Promise<any[]>;
}
