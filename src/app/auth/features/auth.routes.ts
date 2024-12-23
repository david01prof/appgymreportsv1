import { Routes } from '@angular/router';

export const routesAuth: Routes = [
  { path: 'sign-in', loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent) },
  { path: 'sign-up', loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent) },
  { path: 'forgetPassword', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) }
];
