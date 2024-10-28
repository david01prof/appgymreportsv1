import { Routes } from '@angular/router';

const registersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./registers.component').then((m) => m.RegistersComponent),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./calculator/calculator.component').then(
        (m) => m.CalculatorComponent
      ),
    outlet: 'steps'
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('./photos/photos.component').then(
        (m) => m.PhotosComponent
      ),
    outlet: 'steps'
  },
  {
    path: 'resumen',
    loadComponent: () =>
      import('./calculator/calculator.component').then(
        (m) => m.CalculatorComponent
      ),
    outlet: 'steps'
  },
];

export default registersRoutes;
