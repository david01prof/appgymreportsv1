import { Routes } from '@angular/router';

export const routinesRoutes: Routes = [
  { path: '', loadComponent: () => import('./container-routines.component').then(m => m.ContainerRoutinesComponent) },
];
