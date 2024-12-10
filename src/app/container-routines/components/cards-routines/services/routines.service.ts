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
import { IRoutine, ITag } from '@app/container-routines/interfaces/iroutine';
import { APP_CONSTANTS } from '@app/shared/constants';
import { Observable } from 'rxjs';


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

  public newRoutine(
    routine: Partial<IRoutine>
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._routineCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...routine,
    });
  }

  public getAllRoutines(): Observable<IRoutine[]> {
    const queryFn = query(this._routineCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, { idField: 'id' }) as Observable<IRoutine[]>;
  }

  public async getRoutineById(id: string): Promise<IRoutine> {
    const docRef = this._getDocRef(id);

    const documentData = await getDoc(docRef);

    return documentData.data() as IRoutine;
  }

  public updateRoutine(id: string, routine: IRoutine): void {
    const docRef = this._getDocRef(id);

    updateDoc(docRef, { ...routine });
  }

  public deleteRoutine(id: string): void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
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

  constructor(private fb: FormBuilder) {}

  public getColorsTag(): ITag[] {
    return [
      { name: 'Azul', code: 'primary' },
      { name: 'Rojo', code: 'danger' },
      { name: 'Verde', code: 'success' },
      { name: 'Naranja', code: 'warning' },
      { name: 'Negro', code: 'contrast' },
    ];
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
}
