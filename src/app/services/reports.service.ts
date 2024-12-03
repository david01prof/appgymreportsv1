import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query } from '@angular/fire/firestore';
import { IReport } from '@app/models/ireport';
import { APP_CONSTANTS } from '@app/shared/constants';
import { catchError, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private readonly _firestore = inject(Firestore);
  private readonly _reportCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME_REGISTERS);

  public getAllReports() : Observable<IReport[]>{
    const queryFn = query(this._reportCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<IReport[]>;
  }

  public newReport( report: Partial<IReport>): Promise<DocumentReference<DocumentData, DocumentData>>  {
    return addDoc(this._reportCollection,{
      created: Date.now(),
      updated: Date.now(),
      ...report
    })
  }

  public addReport2( report: Omit<IReport, "id">): Observable<any>  {
    return from(addDoc(this._reportCollection,{
      created: Date.now(),
      updated: Date.now(),
      ...report
    })).pipe(
      catchError(() => {
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    )
  }

  public removeReport(id: number) : Observable<void>{
    const docRef = this._getDocRef(id.toString());
    
    return from(deleteDoc(docRef)).pipe(
      catchError(() => {
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    );
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_REGISTERS, id);
  }
}
