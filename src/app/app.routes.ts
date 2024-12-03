import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./features/dashboard/dashboard.component'),
  // },
  // {
  //   path: 'routines',
  //   loadComponent: () => import('./features/routines/routines.component'),
  // },
  // {
  //   path: 'registers',
  //   loadComponent: () => import('./features/registers/registers.component'),
  // },
  // { path: '**', redirectTo: '/reports' },
  {
    path: 'reports',
    loadComponent: () =>
      import('./main-container/main-container.component').then(
        (m) => m.MainContainerComponent,
      ),
  },
  {
    path: 'add-edit-report',
    loadComponent: () =>
      import(
        './main-container/components/report-add-edit/report-add-edit.component'
      ).then((m) => m.ReportAddEditComponent),
  }
];
