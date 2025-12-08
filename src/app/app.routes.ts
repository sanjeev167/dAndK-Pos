/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Application route definitions with role-based access control.
 * Uses RoleGuard to protect specific routes according to roles.
 */

import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Default route redirects to dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Admin route protected by RoleGuard
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },

  // Reports route protected by RoleGuard for REPORT_VIEWER
  {
    path: 'reports',
    canActivate: [RoleGuard],
    data: { roles: ['REPORT_VIEWER'] },
    loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)
  },

  // Dashboard route (accessible to all authenticated users)
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  // Wildcard route for 404 page
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
