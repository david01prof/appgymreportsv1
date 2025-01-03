import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  orderBy,
  query,
  Timestamp,
  updateDoc
} from '@angular/fire/firestore';
import { FormArray, FormBuilder } from '@angular/forms';
import { IRoutine, ITag, Status } from '@app/models/iroutine';
import { APP_CONSTANTS } from '@app/shared/constants';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { where } from 'firebase/firestore';
import { catchError, from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  // FIREBASE CONFIGURATION

  public data: IRoutine[] = [];

  private readonly _firestore = inject(Firestore);
  private readonly _routineCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME_ROUTINES
  );
  private readonly _auth = inject(AuthStateService);

  public getAllRoutines(): Observable<IRoutine[]> {
    const queryFn = query(this._routineCollection, where('userId', '==', this._auth.currentUser!.uid), orderBy('created', 'desc'));
    return collectionData(queryFn, { idField: 'id' }) as Observable<IRoutine[]>;
  }

  public newRoutine( routine: Partial<IRoutine>): Observable<any>  {
    return from(addDoc(this._routineCollection, {
      created: Date.now(),
      updated: Date.now(),
      userId: this._auth.currentUser!.uid,
      ...routine,
    })).pipe(
      catchError((error) => {
        console.error('Error al agregar el reporte:', error);
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    )
  }

  // public async getRoutineById(id: string): Promise<IRoutine> {
  //   const docRef = this._getDocRef(id);

  //   const documentData = await getDoc(docRef);

  //   return documentData.data() as IRoutine;
  // }

  public updateRoutine(id: string, routine: IRoutine): void {
    const docRef = this._getDocRef(id);

    updateDoc(docRef, { ...routine });
  }

  public deleteRoutine(id: number): Observable<void> {
    const docRef = this._getDocRef(id.toString());
    
    return from(deleteDoc(docRef)).pipe(
      catchError(() => {
        console.error("error prevented for testing")
        return Promise.resolve()
      })
    );
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_ROUTINES, id);
  }

  public safeData(data: IRoutine[]) {
    this.data = data;
  }

  public getSafeData() {
    return this.data;
  }

  // OTHERS METHODS

  public getColorsTag(): Status[] {
    return [
      { label: 'Rojo', severity: 'danger' },
      { label: 'Verde', severity: 'success' },
      { label: 'Naranja', severity: 'warning' },
      { label: 'Negro', severity: 'contrast' },
    ]
  }

  public getBreadcrumbLabels() {
    return [{ label: 'Rutinas' }];
  }

  public getSeries(id: number, exercises: any): FormArray {
    return exercises.at(id).get('series') as FormArray;
  }

  public convertTimeStamptoDate(timestamp: Timestamp) {
    return timestamp.toDate();
  }

  public getTranslateDate(date: any) {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric', // Año
      month: 'long', // Mes completo
      day: 'numeric', // Día del mes
    };

    return new Intl.DateTimeFormat('es-ES', opciones).format(date);
  }

  public getItemsFilter() {
    return [
      { name: 'Titulo', code: 'title' },
      { name: 'Favoritos', code: 'favorites' },
      { name: 'No favoritos', code: 'nofavorites' },
      { name: 'Tag', code: 'tag' },
      { name: 'Fecha', code: 'date' },
    ];
  }

  public getBreadcrumbLabelsNew() {
    return [{ label: 'Rutinas' },{ label: 'Nuevo' }, ];
  }
}
