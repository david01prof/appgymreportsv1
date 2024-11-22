import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { IMeasurement } from '../../interfaces/imeasurement';
import { IRegister } from '../../interfaces/iregister';
import { StepsRegistersComponent } from '../../steps-registers/steps-registers.component';

@Component({
  selector: 'app-new-card-register',
  standalone: true,
  imports: [CardModule,CommonModule,DialogModule,StepsRegistersComponent],
  templateUrl: './new-card-register.component.html',
  styleUrl: './new-card-register.component.scss'
})
export class NewCardRegisterComponent {

  public visible: boolean = false;
  public aplicarEstilo = true;
  public active : number | undefined;;
  public resumenMeasurement !: IRegister; 

  private dataCalculator : IMeasurement = {
    height: 0,
    age: 0,
    waist: 0,
    hip: 0,
    weight: 0,
    totaligc: "",
    genre: false
  };

  getShowDialog(e: boolean){
    this.visible = e;
  }

  clearMeasurement(){
    this.resumenMeasurement  = { calculator: this.dataCalculator, photos: [] }
    this.active = 0;
  }
}
