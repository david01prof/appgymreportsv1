import { Routes } from '@angular/router';

const routinesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
    }
]

export default routinesRoutes;