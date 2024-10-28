import { Routes } from '@angular/router';
import { RegistersComponent } from './features/registers/registers.component';
import { CalculatorComponent } from './features/registers/calculator/calculator.component';
import { PhotosComponent } from './features/registers/photos/photos.component';
import { ResumenComponent } from './features/registers/resumen/resumen.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
  },
  {
    path: 'routines',
    loadChildren: () => import('./features/routines/routines.routes'),
  },
  // {
  //   path: 'registers',
  //   loadChildren: () => import('./features/registers/registers.routes'),
  // },
  {
    path: 'registers',
    component: RegistersComponent, // Cargado en el router-outlet principal
    children: [
      {
        path: 'calculator',
        component: CalculatorComponent,
        outlet: 'steps' // Cargado en el router-outlet con nombre "sidebar"
      },
      {
        path: 'photos',
        component: PhotosComponent,
        outlet: 'steps' // Cargado en el router-outlet con nombre "sidebar"
      },
      {
        path: 'resumen',
        component: ResumenComponent,
        outlet: 'steps' // Cargado en el router-outlet con nombre "sidebar"
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' },
];
