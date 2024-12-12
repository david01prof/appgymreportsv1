import { Routes } from '@angular/router';

export const routesDashboard: Routes = [
  { path: '', loadComponent: () => import('./container-dashboard.component').then(m => m.ContainerDashboardComponent), outlet: 'content' },
];
