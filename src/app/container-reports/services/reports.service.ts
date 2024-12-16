import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { IPhotos, IReport } from '@app/models/ireport';
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

  public addReport( report: Omit<IReport, "id" | "created">): Observable<any>  {

    let comprimedPhotos : IPhotos[] = [];

    for(let photo of report.photos){
      (async () => {
        try {
          const compressedBase64 = this.base64ToBlob(photo.base64 as string);
          comprimedPhotos.push({ base64: compressedBase64 });
          console.log("Imagen comprimida:", compressedBase64);
        } catch (error) {
          console.error("Error al comprimir la imagen:", error);
        }
      })();
    }

    report.photos = comprimedPhotos;


    if(comprimedPhotos.length > 0 ){
      return from(addDoc(this._reportCollection,{
        created: Date.now(),
        updated: Date.now(),
        userId: this._auth.currentUser!.uid,
        ...report
      })).pipe(
        catchError((error) => {
          console.error('Error al agregar el reporte:', error);
          console.info("error prevented for testing")
          return Promise.resolve()
        })
      )
    }else{
      console.info("error prevented for testing")
      return new Observable;
    }
    
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

  private isValidBase64 = (str: string) => {
    return /^data:image\/(png|jpeg|jpg);base64,/.test(str);
  };

  private base64ToBlob = (base64: string): Blob => {
    // Extraer el tipo MIME (opcional)
    const [metadata, data] = base64.split(',');
    const mimeMatch = metadata.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  
    // Convertir base64 a bytes
    const binaryData = atob(data); // Decodificar base64 a binario
    const byteArray = new Uint8Array(binaryData.length);
  
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
  
    // Crear un Blob con los datos binarios
    return new Blob([byteArray], { type: mimeType });
  };
}
