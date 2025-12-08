/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Defines the structure of a MenuItem used in the application.
 * Supports hierarchical menu with optional children.
 */

export interface MenuItem {
  id: number;
  label: string;
  route: string;
  children?: MenuItem[]; // Optional for submenus
}
