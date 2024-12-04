import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
  },
  {
    path: 'routines',
    loadComponent: () => import('./features/routines/routines.component'),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./main-container/main-container.component').then(
        (m) => m.MainContainerComponent,
      ),
  },
  {
    path: 'reports/:id',
    loadComponent: () =>
      import('./main-container/components/report-detail/report-detail.component').then(
        (m) => m.ReportDetailComponent,
      ),
  },
  {
    path: 'add-report',
    loadComponent: () =>
      import(
        './main-container/components/report-add/report-add.component'
      ).then((m) => m.ReportAddComponent),
  },
  { path: '**', redirectTo: '/dashboard' },
];
