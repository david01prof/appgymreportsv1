import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IRoutine } from '../../iroutine';
import { NewRoutineComponent } from './new-routine/new-routine.component';

const PRIME_MODULES = [CardModule, DialogModule,InputTextModule];
@Component({
  selector: 'app-new-card-routine',
  standalone: true,
  imports: [CommonModule, PRIME_MODULES, NewRoutineComponent,ReactiveFormsModule],
  template: `
    <div>
      <p-card class="mb-3 new-card" (click)="showDialog()">
        <i class="pi pi-plus p-6 text-2xl text-color-secondary"> </i>
      </p-card>
      <pre class="text-center text-color-secondary ">Crear nueva rutina</pre>
      
      <p-dialog
        [modal]="true"
        [(visible)]="visible"
        [style]="{ width: '90%' }"
        [dismissableMask]="true"
        header="cabecera "
      >
        <ng-template pTemplate="header" class="cabecera">
          <input type="text" pInputText [formControl]="titleRoutine" class="mr-5">
        </ng-template>

        <app-new-routine
              *ngIf="chargeComponent"
              (sendSubmitValue)="getValueSubmit($event)"
              [titleRoutine]="titleRoutine.value!"
            ></app-new-routine>
      </p-dialog>
    </div>
  `,
  styles: `
    .cabecera{
      background: red;
    }  

    ::ng-deep .p-inputtext {
      width: auto;
    }

    ::ng-deep .p-dialog .p-dialog-header-icons {
      display: flex;
      align-items: center;
      margin-right: 1.5rem;
    }
  `,
})
export class NewCardRoutineComponent {

  public visible: boolean = false;
  public chargeComponent: boolean = false;
  public item!: IRoutine;
  public titleRoutine = new FormControl('Nueva rutina')

  showDialog() {
    this.visible = true;
    this.chargeComponent = true;
  }

  getValueSubmit(e: any) {
    this.visible = false;
  }
}
