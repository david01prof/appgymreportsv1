import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CalculatorService } from './calculator.service';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES,FormsModule,CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [MessageService],
})
export default class CalculatorComponent {

  height: string = '';
  age: string = '';
  waist: string = ''; // cintura
  hip: string = ''; // cadera
  weight: string = '';

  totaligc: string | undefined;

  calculatorService = inject(CalculatorService);

  constructor(private messageService: MessageService) {}

  public sendMeasurements() {
    let measurement = {
      genre: true,
      height: parseFloat(this.height),
      weight: parseInt(this.weight),
      age: parseInt(this.age),
      waist: parseInt(this.waist),
      hip: parseInt(this.hip),
    };
    this.totaligc = this.calculatorService.calculateMeasurement(measurement);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'PGC actualizado correctamente',
    });
  }
}
