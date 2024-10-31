import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StepperModule } from 'primeng/stepper';
import { CalculatorComponent } from '../../features/registers/calculator/calculator.component';
import { PhotosComponent } from '../../features/registers/photos/photos.component';
import { ResumenComponent } from '../../features/registers/resumen/resumen.component';
import { RegistersService } from '../../features/registers/registers.service';

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

  private readonly _registerSvc = inject(RegistersService);

  ngOnInit(): void {}

  saveRegister(){
    this._registerSvc.newRegister();
  }
}
