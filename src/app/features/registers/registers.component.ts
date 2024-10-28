import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';
import { StepsRegistersComponent } from '../../components/steps-registers/steps-registers.component';
import { TableComponent } from '../../components/table/table.component';
import { IRoutine } from '../routines/iroutine';
import { RoutinesService } from '../routines/routines.service';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule,TableComponent];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES,ReactiveFormsModule,CommonModule,StepsRegistersComponent],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  providers: [MessageService],
})
export class RegistersComponent {

  public forms!: FormGroup;

  public totaligc: string | undefined;
  public data: IRoutine[] = [];

  private _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);


  constructor() {
  }

  ngOnInit(): void {
    this.getAllRoutines();
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
