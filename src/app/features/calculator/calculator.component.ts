import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CalculatorService } from './calculator.service';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES,ReactiveFormsModule,CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [MessageService],
})
export default class CalculatorComponent {

  public forms!: FormGroup;

  public totaligc: string | undefined;

  private readonly _calculatorSvc = inject(CalculatorService);

  constructor(private messageService: MessageService) {
    this.forms = new FormGroup({
      height: new FormControl(''),
      age: new FormControl(''),
      waist: new FormControl(''), // cintura
      hip: new FormControl(''), // cadera
      weight: new FormControl(''),
      totaligc: new FormControl(''),
    });
  }

  onSubmit() {
    let measurement = {
      genre: true,
      height: parseFloat(this.forms.value.height),
      weight: parseInt(this.forms.value.weight),
      age: parseInt(this.forms.value.age),
      waist: parseInt(this.forms.value.waist),
      hip: parseInt(this.forms.value.hip),
    };

    this.forms.value.totaligc = this._calculatorSvc.calculateMeasurement(measurement);
    this._calculatorSvc.newMeasurement(this.forms.value);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'PGC actualizado correctamente',
    });
  }
}
