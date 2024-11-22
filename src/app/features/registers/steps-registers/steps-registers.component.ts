import { CommonModule } from '@angular/common';
import { Component, inject, input, OnChanges, OnInit, output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StepperModule } from 'primeng/stepper';
import { IMeasurement } from '../interfaces/imeasurement';
import { IPhotos, IRegister } from '../interfaces/iregister';
import { RegistersService } from '../services/registers.service';
import { CalculatorComponent } from './calculator/calculator.component';
import { PhotosComponent } from './photos/photos.component';
import { ResumenComponent } from './resumen/resumen.component';

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
export class StepsRegistersComponent implements OnInit,OnChanges {

  public activeInputExit = input.required<number | undefined>();
  public active = 0
  public resumenMeasurement !: IRegister; 
  public chargeComponent: boolean = false;
  public showDialog = output<boolean>();

  private dataCalculator : IMeasurement = {
    height: 0,
    age: 0,
    waist: 0,
    hip: 0,
    weight: 0,
    totaligc: "",
    genre: false
  };

  private readonly _registerSvc = inject(RegistersService);

  ngOnInit(): void {
    this.resumenMeasurement  = { calculator: this.dataCalculator, photos: [] }
  }

  ngOnChanges(){
    if(this.activeInputExit() != undefined){
      console.log('entra?');
      
      console.log(this.activeInputExit());
      
      this.active = this.activeInputExit()!
    }
  }

  saveRegister(){
    this._registerSvc.newRegister(this.resumenMeasurement);
    this.showDialog.emit(false);
    this.resumenMeasurement  = { calculator: this.dataCalculator, photos: [] }
  }

  getValueCalculator(e:IMeasurement){
    this.resumenMeasurement.calculator = e;    
    console.log(e);
    
  }

  clearMeasurement(){
    this.resumenMeasurement  = { calculator: this.dataCalculator, photos: [] }
  }

  getValuePhotos(e:IPhotos[]){
    this.resumenMeasurement.photos = e;
    console.log(this.resumenMeasurement);
    
  }
}
