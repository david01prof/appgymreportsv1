import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from '@angular/fire/auth';
import { Gender, IUser } from '@app/models';
import { APP_CONSTANTS } from '@app/shared/constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root', // Proporciona el servicio a nivel global
})
export class AuthService {

  private readonly _firestore = inject(Firestore);
  private _auth = inject(Auth);

  signUp(user: Omit<IUser, 'username' | 'age' | 'gender' | 'objetiveWeight' | 'actualWeight' | 'photo' | 'createdAt'>) {
  return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signIn(user: Omit<IUser, 'username' | 'age' | 'gender' | 'objetiveWeight' | 'actualWeight' | 'photo' | 'createdAt'>) {
    return signInWithEmailAndPassword(this._auth,user.email,user.password);
  }

  async saveUser(user: Omit<IUser, 'createdAt'>, idUser: string) {
    try{
      const userRef = doc(this._firestore, `${APP_CONSTANTS.COLLECTION_NAME_USERS}/${idUser}`);
      await setDoc(userRef, {
        email: user.email,
        username: user.username,
        age: user.age,
        gender: user.gender,
        objetiveWeight: user.objetiveWeight,
        actualWeight: user.actualWeight,
        photo: user.photo,
        createdAt: new Date().toISOString() // Fecha de creación opcional
      });
      console.log('Usuario creado con éxito');
    }catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }

  }

  public updateUser(id: string, user: IUser): void {
    const docRef = this._getDocRef(id);

    updateDoc(docRef, { ...user });
  }

  public async getUserById(id: string): Promise<IUser> {
    const docRef = this._getDocRef(id);

    const documentData = await getDoc(docRef);

    return documentData.data() as IUser;
  }

  async resetPassword(email: string): Promise<void> {
    const auth = getAuth();
  
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo de restablecimiento enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar correo de restablecimiento:", error);
      throw error;
    }
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_USERS, id);
  }

  signInWidthGoogle() {

    const  provider = new GoogleAuthProvider();

    provider.setCustomParameters({prompt: 'select_account'});
    return signInWithPopup(this._auth, provider);
  }



  // ------------

  public getBreadcrumbLabels() {
    return [{ label: 'Perfil' }];
  }
}
