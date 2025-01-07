import { Routes } from '@angular/router';
import { ContainerDashboardComponent } from './container-dashboard/container-dashboard.component';
import { PoliticTermsComponent } from './container-legalTerms/politic-terms/politic-terms.component';
import { ContainerProfileComponent } from './container-profile/container-profile.component';
import { ContainerReportsComponent } from './container-reports/container-reports.component';
import { ReportAddComponent } from './container-reports/report-add/report-add.component';
import { ReportDetailComponent } from './container-reports/report-detail/report-detail.component';
import { AddRoutineComponent } from './container-routines/add-routine/add-routine.component';
import { ContainerRoutinesComponent } from './container-routines/container-routines.component';
import { privateGuard, publicGuard } from './core/auth.guard';
import { DetailUpdateReportComponent } from './container-routines/detail-update-routine/detail-update-routine.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    // loadChildren: () => import('./container-dashboard/dashboard.routes').then((m) => m.routesDashboard),
    children: [
      { path: '', component: ContainerDashboardComponent , outlet: 'content' }
    ]
  },
  {
    path: 'routines',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', component: ContainerRoutinesComponent , outlet: 'content' },
      { path: 'add', component: AddRoutineComponent , outlet: 'content' },
      { path: ':id', component: DetailUpdateReportComponent , outlet: 'content' },
    ]
  },

  // Reports
  {
    path: 'reports',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    // TODO NO FUNCIONA: loadChildren: () => import('./container-reports/reports.routes').then(m => m.routesReports) ,
    children: [
      { path: '', component: ContainerReportsComponent , outlet: 'content' },
      { path: 'add', component: ReportAddComponent , outlet: 'content' },
      { path: ':id', component: ReportDetailComponent , outlet: 'content' },
    ]
  },
  {
    path: 'profile',
    canActivate: [privateGuard()],
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    // loadChildren: () => import('./container-dashboard/dashboard.routes').then((m) => m.routesDashboard),
    children: [
      { path: '', component: ContainerProfileComponent , outlet: 'content' }
    ]
  },
  {
    path: 'politic-terms',
    loadComponent: () => import('./shared/ui/layout.component').then(m => m.LayoutComponent),
    // loadChildren: () => import('./container-dashboard/dashboard.routes').then((m) => m.routesDashboard),
    children: [
      { path: '', component:  PoliticTermsComponent, outlet: 'content' }
    ]
  },
  {
    path: 'auth',
    canActivateChild: [publicGuard()],
    loadChildren: () =>
      import('./auth/features/auth.routes').then((m) => m.routesAuth),
  },
  { path: '**', redirectTo: '/dashboard' },
];
