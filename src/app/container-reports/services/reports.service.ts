import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { IReport } from '@app/models/ireport';
import { APP_CONSTANTS } from '@app/shared/constants';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { PrimeNGConfig } from 'primeng/api';
import { catchError, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private dataReports: IReport[] = [];
  private readonly _firestore = inject(Firestore);
  private readonly _reportCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME_REGISTERS);
  private readonly config = inject(PrimeNGConfig);
  private readonly _auth = inject(AuthStateService);

  public getAllReports() : Observable<IReport[]>{
    const queryFn = query(this._reportCollection,  where('userId', '==', this._auth.currentUser!.uid), orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<IReport[]>;
  }

  public newReport( report: Partial<IReport>): Promise<DocumentReference<DocumentData, DocumentData>>  {
    return addDoc(this._reportCollection,{
      created: Date.now(),
      updated: Date.now(),
      ...report,
      userId: this._auth.currentUser!.uid
    })
  }

  public addReport( report: Omit<IReport, "id" | "created">): Observable<any>  {
    return from(addDoc(this._reportCollection,{
      created: Date.now(),
      updated: Date.now(),
      userId: this._auth.currentUser!.uid,
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

  // --------------

  public getBreadcrumbLabels() {
    return [{ label: 'Reportes' }];
  }

  public safeReports(reports: IReport[]) {
    this.dataReports = reports;
  }
  public getSafeData() {
    return this.dataReports;
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes![0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes![i]}`;
  }
}
