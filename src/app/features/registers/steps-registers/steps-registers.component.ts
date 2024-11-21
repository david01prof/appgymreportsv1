import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StepperModule } from 'primeng/stepper';
import { RegistersService } from '../services/registers.service';
import { CalculatorComponent } from './calculator/calculator.component';
import { PhotosComponent } from './photos/photos.component';
import { ResumenComponent } from './resumen/resumen.component';
import { IMeasurement } from '../interfaces/imeasurement';
import { log } from 'console';
import { IPhotos, IRegister } from '../interfaces/iregister';

const PRIME_MODULES = [
  IconFieldModule,
  InputIconModule,
  ButtonModule,
  StepperModule,
];
@Component({
  selector: 'app-steps-registers',
  standalone: true,
  imports: [
    PRIME_MODULES,
    CalculatorComponent,
    PhotosComponent,
    ResumenComponent,
    CommonModule,
  ],
  templateUrl: './steps-registers.component.html',
  styleUrl: './steps-registers.component.scss',
  providers: [MessageService],
})
export class StepsRegistersComponent implements OnInit {

  public active: number = 0;
  public resumenMeasurement !: IRegister; 
  public chargeComponent: boolean = false;

  private dataCalculator : IMeasurement = {
    height: 0,
    age: 0,
    waist: 0,
    hip: 0,
    weight: 0,
    totaligc: "",
    genre: false
  };
  private dataPhotos : IPhotos[] = [];

  private readonly _registerSvc = inject(RegistersService);

  ngOnInit(): void {
    this.resumenMeasurement  = { calculator: this.dataCalculator, photos: [] }
  }

  saveRegister(){
    this._registerSvc.newRegister(this.resumenMeasurement);
  }

  createRegister(){
    console.log(this.dataCalculator);
    console.log(this.dataPhotos);

  }

  getValueCalculator(e:IMeasurement){
    this.resumenMeasurement.calculator;
  }

  getValuePhotos(e:IPhotos[]){
    this.resumenMeasurement.calculator = this.dataCalculator;
    this.resumenMeasurement.photos = e;
  }
}
