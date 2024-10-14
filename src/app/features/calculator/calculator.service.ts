import { Injectable } from '@angular/core';
import { IMeasurement } from '../../shared/interfaces/imeasurement';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private dataSQLPGC : number[] = [23.2,18.3,20.4,5.4,8.9];

  constructor() { }

  public calculateMeasurement(measurement: IMeasurement) : string{

    let ibm = measurement.weight / (measurement.height * measurement.height)
    
    let pgc = 1.20 * ibm + 0.23 * measurement.age + 0.54 * (measurement.waist / measurement.hip) - 16.2;

    this.dataSQLPGC.push(pgc)

    return pgc.toFixed(2)
    
  }

  public get allPGCS(){
    return this.dataSQLPGC;
  }
}
