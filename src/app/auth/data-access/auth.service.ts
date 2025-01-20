import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  query,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { IUser } from '@app/models';
import { APP_CONSTANTS } from '@app/shared/constants';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { catchError, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Proporciona el servicio a nivel global
})
export class AuthService {
  private readonly _firestore = inject(Firestore);
  private readonly _userCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME_USERS
  );

  constructor(private _auth: Auth) {}

  public getAllUsers(): Observable<IUser[]> {
    const queryFn = query(this._userCollection);
    return collectionData(queryFn) as Observable<IUser[]>;
  }

  signUp(user: Omit<IUser, 'username' | 'age' | 'gender' | 'objetiveWeight' | 'actualWeight' | 'photo' | 'createdAt'>) : Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this._auth, user['email'], user['password']))
  }

  signIn(user: Omit<IUser, 'username' | 'age' | 'gender' | 'objetiveWeight' | 'actualWeight' | 'photo' | 'createdAt'>) : Observable<any> {
    return from(signInWithEmailAndPassword(this._auth,  user['email'], user['password'])); 
  }

  async saveUser(user: Omit<IUser, 'createdAt'>, idUser: string) {
    try {
      const userRef = doc(
        this._firestore,
        `${APP_CONSTANTS.COLLECTION_NAME_USERS}/${idUser}`
      );
      await setDoc(userRef, {
        email: user['email'],
        username: user['username'],
        age: user['age'],
        gender: user['gender'],
        objetiveWeight: user['objetiveWeight'],
        actualWeight: user['actualWeight'],
        photo: user['photo'],
        createdAt: new Date().toISOString(), // Fecha de creación opcional
      });
    } catch (error) {
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

  async resetPassword(email: string): Promise<Observable<any>> {
    const auth = getAuth();

    return from(sendPasswordResetEmail(auth, email)).pipe(
      map(() => ({ success: true })),
      catchError((error) => {
        return Promise.resolve();
      })
    );
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_USERS, id);
  }

  signInWidthGoogle() {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this._auth, provider);
  }

  // ------------

  public getBreadcrumbLabels() {
    return [{ label: 'Perfil' }];
  }
}
