import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { NewRoutineComponent } from './new-routine/new-routine.component';
import { IRoutine } from '@app/models/iroutine';
import { RoutinesService } from '../services/routines.service';

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
export class NewCardRoutineComponent implements OnInit {
  public visible: boolean = false;
  public chargeComponent: boolean = false;
  public item!: IRoutine;
  public date: string = '';
  public titleRoutine = new FormControl('Nueva rutina');
  public aplicarEstilo = true;

  private readonly _routineSvc = inject(RoutinesService);

  ngOnInit(): void {
    this.date = this._routineSvc.getTranslateDate(new Date());
  }

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
