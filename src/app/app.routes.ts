import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    loadChildren: () => import('./container-dashboard/dashboard.routes').then(m => m.routesDashboard),
  },
  {
    path: 'routines',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    loadChildren: () => import('./container-routines/routines.routes').then(m => m.routinesRoutes)
  },
  {
    path: 'reports',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    loadChildren: () =>
      import('./container-reports/reports.routes').then(m => m.routesReports)
  },
  {
    path: 'auth',
    canActivateChild: [publicGuard()],
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.routesAuth)
  },
  { path: '**', redirectTo: '/dashboard' },
];
