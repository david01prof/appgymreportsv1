import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CalculatorService } from './calculator.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRoutine } from '../routines/iroutine';
import { RoutinesService } from '../routines/routines.service';
import { TableComponent } from '../../components/table/table.component';
import { StepsRegistersComponent } from '../../components/steps-registers/steps-registers.component';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule,TableComponent];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES,ReactiveFormsModule,CommonModule,StepsRegistersComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [MessageService],
})
export default class CalculatorComponent {

  public forms!: FormGroup;

  public totaligc: string | undefined;
  public data: IRoutine[] = [];

  private _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);
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

  ngOnInit(): void {
    this.getAllRoutines();
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


  getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.data = [...routines]))
      )
      .subscribe();
  }
}
