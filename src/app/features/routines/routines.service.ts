import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { APP_CONSTANTS } from '../../shared/constants';
import { Observable } from 'rxjs';
import { IRoutine } from './iroutine';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  private readonly _firestore = inject(Firestore);
  private readonly _routineCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME);

  public newRoutine(routine: Partial<IRoutine>): Promise<DocumentReference<DocumentData, DocumentData>>  {
    return addDoc(this._routineCollection,{
      created: Date.now(),
      updated: Date.now(),
      ...routine
    })
  }

  public getAllRoutines() : Observable<IRoutine[]>{
    const queryFn = query(this._routineCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<IRoutine[]>
  }

  public async getRoutineById(id: string) : Promise<IRoutine> {
    const docRef = this._getDocRef(id);

    const documentData = await getDoc(docRef);

    return documentData.data() as IRoutine;
  }

  public updateRoutine(id:string, routine: IRoutine) : void {
    const docRef = this._getDocRef(id);

    updateDoc(docRef, { ...routine });
  }

  public deleteRoutine(id: string) : void{
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
