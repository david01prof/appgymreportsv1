import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';


export interface User {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root', // Proporciona el servicio a nivel global
})
export class AuthService {

  private _auth = inject(Auth);

  signUp(user: User) {
  return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth,user.email,user.password);
  }

  signInWidthGoogle() {

    const  provider = new GoogleAuthProvider();

    provider.setCustomParameters({prompt: 'select_account'});
    return signInWithPopup(this._auth, provider);
  }
}
