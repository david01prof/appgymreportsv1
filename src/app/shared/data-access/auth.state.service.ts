import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);
  private _router = inject(Router);

  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  logout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log('Logout exitoso');
        // Redirigir o realizar alguna acción post-logout
        return this._router.navigate(['/auth/sign-in']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
