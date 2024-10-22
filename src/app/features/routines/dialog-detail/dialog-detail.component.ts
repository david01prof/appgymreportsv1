import { Component, inject, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IRoutine } from '../iroutine';
import { NewEditComponent } from '../new_edit/new_edit.component';
import { RoutinesService } from '../routines.service';
import { CommonModule } from '@angular/common';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,AccordionModule]
@Component({
  selector: 'app-dialog-detail',
  standalone: true,
  imports: [PRIME_MODULES,NewEditComponent,CommonModule],
  templateUrl: './dialog-detail.component.html',
  styleUrl: './dialog-detail.component.scss',
})
export class DialogDetailComponent {
  
  public isUpdate = input.required<boolean>();
  public isDelete = input<boolean>();
  public routine = input<IRoutine>();

  public visible : boolean = false;
  public chargeComponent : boolean = false;

  private readonly _routineSvc = inject(RoutinesService);

  showDialog() {
    this.visible = true;
  }

  showDialogUpdated() {
    this.visible = true;
    this.chargeComponent = true;
  }

  deleteRoutine(id: any) {
    if(id != undefined){
      this._routineSvc.deleteRoutine(id);
    }
    this.visible = false;
  }
}
