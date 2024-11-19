import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IRoutine } from '../../interfaces/iroutine';
import { NewRoutineComponent } from './new-routine/new-routine.component';

const PRIME_MODULES = [CardModule, DialogModule, InputTextModule];
@Component({
  selector: 'app-new-card-routine',
  standalone: true,
  imports: [
    CommonModule,
    PRIME_MODULES,
    NewRoutineComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-card-routine.component.html',
  styleUrl: './new-card-routine.component.scss'
})
export class NewCardRoutineComponent {
  public visible: boolean = false;
  public chargeComponent: boolean = false;
  public item!: IRoutine;
  public date: Date = new Date();
  public titleRoutine = new FormControl('Nueva rutina');
  aplicarEstilo = true;

  showDialog() {
    this.visible = true;
    this.chargeComponent = true;
  }

  getValueSubmit(e: any) {
    this.visible = false;
  }

  getsendIsFavourite(e: any) {
    if (e) {
      document.documentElement.style.setProperty(
        '--alignItemFavourite',
        '1.5rem'
      );
    }else{
      document.documentElement.style.setProperty(
        '--alignItemFavourite',
        '0rem'
      );
    }
  }
}
