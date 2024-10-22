import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRoutine } from './iroutine';
import { RoutinesService } from './routines.service';
import { ButtonModule } from 'primeng/button';
import { NewEditComponent } from './new_edit/new_edit.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

const PRIME_MODULES = [ButtonModule,DialogModule];
@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [ListComponent,PRIME_MODULES,NewEditComponent,CommonModule],
  template: `
    <div class="flex justify-content-end my-3">
      <p-button icon="pi pi-plus" (onClick)="showDialog()"/>
      <p-dialog [modal]="true" [(visible)]="visible" [style]="{ width: '90%' }">
    <app-new-edit *ngIf="chargeComponent"></app-new-edit>
  </p-dialog>
    </div>
    <app-list [dataRoutines]="data"></app-list>
  `,
  styles: ``,
})
export class RoutinesComponent implements OnInit {

  public visible : boolean = false;
  public data!: IRoutine[];
  public chargeComponent : boolean = false;

  private readonly _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllRoutines();
  }

  showDialog() {
    this.visible = true;
    this.chargeComponent = true;
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
