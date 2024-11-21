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
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../../shared/constants';
import { IMeasurement } from '../interfaces/imeasurement';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly _firestore = inject(Firestore);
  private readonly _measurementCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME_CALCULATOR
  );

  private dataSQLPGC: number[] = [23.2, 18.3, 20.4, 5.4, 8.9];

  constructor() {}

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

  public calculateMeasurement(measurement: IMeasurement): string {
    let ibm = measurement.weight / (measurement.height * measurement.height);
    let pgc =
      1.2 * ibm +
      0.23 * measurement.age +
      0.54 * (measurement.waist / measurement.hip) -
      16.2;

    return pgc.toFixed(2);
  }

  public get allPGCS() {
    return this.dataSQLPGC;
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME_CALCULATOR, id);
  }
}
