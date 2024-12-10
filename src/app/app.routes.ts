import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [privateGuard()],
    loadComponent: () => import('./features/dashboard/dashboard.component'),
  },
  {
    path: 'routines',
    canActivate: [privateGuard()],
    loadComponent: () => import('./features/routines/routines.component'),
  },
  {
    path: 'reports',
    canActivate: [privateGuard()],
    loadComponent: () =>
      import('./main-container/main-container.component').then(
        (m) => m.MainContainerComponent,
      ),
  },
  {
    path: 'reports/:id',
    canActivate: [privateGuard()],
    loadComponent: () =>
      import('./main-container/components/report-detail/report-detail.component').then(
        (m) => m.ReportDetailComponent,
      ),
  },
  {
    path: 'add-report',
    canActivate: [privateGuard()],
    loadComponent: () =>
      import(
        './main-container/components/report-add/report-add.component'
      ).then((m) => m.ReportAddComponent),
  },
  {
    path: 'auth',
    canActivateChild: [publicGuard()],
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.routesAuth)
  },
  { path: '**', redirectTo: '/dashboard' },
];
