import { Routes } from '@angular/router';

const routinesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routines.component').then(m => m.RoutinesComponent)
    },
    {
        path: 'routine',
        loadComponent: () => import('./new_edit/new_edit.component').then(m => m.NewEditComponent)
    },
    {
        path: 'routine/:id',
        loadComponent: () => import('./new_edit/new_edit.component').then(m => m.NewEditComponent)
    }
]

export default routinesRoutes;