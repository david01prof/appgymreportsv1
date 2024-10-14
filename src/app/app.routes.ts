import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component') },
    { path: 'routines', loadChildren: () => import('./features/routines/routines.routes')},
    { path: 'calculator', loadComponent: () => import('./features/calculator/calculator.component') },
    { path: '**', redirectTo: '/dashboard' }
];
