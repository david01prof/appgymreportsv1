import { Routes } from '@angular/router';

export const routesReports: Routes = [
  { path: '', loadComponent: () => import('./container-reports.component').then(m => m.ContainerReportsComponent), outlet: 'content' },
  { path: ':id', loadComponent: () => import('./container-reports.component').then(m => m.ContainerReportsComponent), outlet: 'content' },
  { path: 'add', loadComponent: () => import('./report-add/report-add.component').then(m => m.ReportAddComponent), outlet: 'content' },
];