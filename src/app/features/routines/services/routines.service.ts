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
  updateDoc,
} from '@angular/fire/firestore';
import { APP_CONSTANTS } from '../../../shared/constants';
import { Observable } from 'rxjs';
import { IRoutine, ITag } from '../interfaces/iroutine';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  // FIREBASE CONFIGURATION

  private readonly _firestore = inject(Firestore);
  private readonly _routineCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME
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
    const queryFn = query(this._routineCollection, orderBy('created', 'asc'));
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
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }

  // OTHERS METHODS

  private form!: FormGroup;

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

  public generateFormRoutines(routine: IRoutine) {
    this.form = new FormGroup({
      titleRoutine: new FormControl(routine.titleRoutine),
      numExercises: new FormControl(routine.numExercises),
      exercises: this.fb.array(routine.exercises),
      date: new FormControl(routine.date),
      comments: new FormControl(routine.comments),
      tag: new FormControl(routine.tag),
      severityTag: new FormControl(routine.severityTag.code),
      favourite: new FormControl(routine.favourite),
    });

    return this.form;
  }

  public getSeries(id: number,exercises:any): FormArray {
    return exercises.at(id).get('series') as FormArray;
  }
  
}
