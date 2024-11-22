import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query } from '@angular/fire/firestore';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../../shared/constants';
import { IRegister } from '../interfaces/iregister';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  public dataRegisters: IRegister[] = [];

  private readonly _firestore = inject(Firestore);
  private readonly _registerCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME_REGISTERS);
  
  constructor(
    private config: PrimeNGConfig
  ) {}

  public getAllRegisters() : Observable<IRegister[]>{
    const queryFn = query(this._registerCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<IRegister[]>
  }
  
  public newRegister( register: Partial<IRegister>): Promise<DocumentReference<DocumentData, DocumentData>>  {
    return addDoc(this._registerCollection,{
      created: Date.now(),
      updated: Date.now(),
      ...register
    })
  }

  public deleteRegister(id: string) : void{
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_REGISTERS, id);
  }

  public getBreadcrumbLabels() {
    return [{ label: 'Registros' }];
  }

  public safeRegisters(registers: IRegister[]) {
    this.dataRegisters = registers;
  }
  public getSafeData() {
    return this.dataRegisters;
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
