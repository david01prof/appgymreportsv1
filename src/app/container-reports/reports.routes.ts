import { Routes } from '@angular/router';

export const routesReports: Routes = [
  { path: '', loadComponent: () => import('./container-reports.component').then(m => m.ContainerReportsComponent) },
  { path: ':id', loadComponent: () => import('./container-reports.component').then(m => m.ContainerReportsComponent) },
  {
    path: 'add-report',
    loadComponent: () => import('./components/report-add/report-add.component').then((m) => m.ReportAddComponent),
  },
];
