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
  orderBy,
  query,
} from '@angular/fire/firestore';
import { AuthService } from '@app/auth/data-access/auth.service';
import { Gender, IMeasurement } from '@app/models/ireport';
import { GlobalService } from '@app/services';
import { APP_CONSTANTS } from '@app/shared/constants';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly _firestore = inject(Firestore);
  private readonly _globalSvc = inject(GlobalService);
  private readonly _measurementCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME_CALCULATOR
  );

  private dataSQLPGC: number[] = [23.2, 18.3, 20.4, 5.4, 8.9];

  public getAllMeasurements(): Observable<IMeasurement[]> {
    const queryFn = query(
      this._measurementCollection,
      orderBy('created', 'desc')
    );
    return collectionData(queryFn, { idField: 'id' }) as Observable<
      IMeasurement[]
    >;
  }

  public newMeasurement(
    measurement: Partial<IMeasurement>
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._measurementCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...measurement,
    });
  }

  public deleteMeasurement(id: string): void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  public calculateMeasurement(measurement: IMeasurement) {

    let porcentajeGrasa: number;

    if (this._globalSvc.userInfo().gender.code === Gender.MALE) {
      porcentajeGrasa = (495 / (1.0324 - 0.19077 * Math.log10(measurement.waist - measurement.neck) + 0.15456 * Math.log10(measurement.height))) - 450;
    } else{
      porcentajeGrasa = (495 / (1.29579 - 0.35004 * Math.log10(measurement.waist + measurement.hip - measurement.neck) + 0.22100 * Math.log10(measurement.height))) - 450;
    }

    return parseFloat(porcentajeGrasa.toFixed(2));
  }
  

  public get allPGCS() {
    return this.dataSQLPGC;
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_CALCULATOR, id);
  }
}
