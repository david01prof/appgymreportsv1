import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RoutinesService } from '../routines.service';

const PRIME_MODULES = [CardModule,ButtonModule,CalendarModule,InputNumberModule,InputTextModule,InputTextareaModule]
@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule, PRIME_MODULES,CommonModule],
  templateUrl: './new_edit.component.html',
  styleUrl: './new_edit.component.scss'
})
export class NewEditComponent {


  titleRoutine: FormControl = new FormControl('Crear nueva rutina' )
  value: string | undefined;
  private readonly _routineSvc = inject(RoutinesService)


  public forms!: FormGroup;

  constructor(private router: Router,private fb: FormBuilder) {
    this.forms = new FormGroup({
      titleExercise: new FormControl(''),
      numSeries: new FormControl(0),
      series: this.fb.array([]),
      date: new FormControl(new Date()),
      comments: new FormControl(''),
      status: new FormControl('EnProceso')
    });
  }

  async onSubmit() {
    if (this.forms.valid) {
      console.log(this.forms.value);
      if((this.forms.value.date.getDate() < new Date().getDate())){
        this.forms.value.status = 'Finalizada';
      }else if ((this.forms.value.date.getDate() == new Date().getDate()) && (this.forms.value.date.getMonth() < new Date().getMonth())){
        this.forms.value.status = 'Finalizada';
      }else if ((this.forms.value.date.getDate() == new Date().getDate()) && (this.forms.value.date.getMonth() > new Date().getMonth())){
        this.forms.value.status = 'Pendiente';
      }else if ((this.forms.value.date.getDate() > new Date().getDate())){
        this.forms.value.status = 'Pendiente';
      }
      
      console.log(this.forms.value.date);
      
      await this._routineSvc.newRoutine(this.forms.value)
      this.router.navigate(['routines']);
    } else {
      console.log('Formulario inválido');
    }
  }


  onKeyDown(event:any){
    this.generarControles();  // Generamos los controles
  }

  get series(): FormArray {
    return this.forms.get('series') as FormArray;
  }

  generarControles() {
    // Limpiar el FormArray actual en caso de que ya tenga controles
    this.series.clear();

    for (let i = 0; i < this.forms.value.numSeries; i++) {
      this.series.push(
        this.fb.group({
          replays: new FormControl(0),  // Control para replays
          weight:  new FormControl(0)   // Control para weight
        })
      ) 
    }
  }
}
