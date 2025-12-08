/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Defines the structure of a User in the application.
 * Includes username, roles, and token for authentication.
 */

export interface User {
  username: string;
  roles: string[];
  token: string;
}
