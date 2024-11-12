import { Component, inject, input, output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IRoutine } from '../iroutine';
import { NewEditComponent } from '../new_edit/new_edit.component';
import { RoutinesService } from '../routines.service';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,AccordionModule]
@Component({
  selector: 'app-dialog-detail',
  standalone: true,
  imports: [PRIME_MODULES,NewEditComponent,CommonModule],
  templateUrl: './dialog-detail.component.html',
  styleUrl: './dialog-detail.component.scss',
})
export class DialogDetailComponent {
  
  public routine = input.required<IRoutine>();
  public form = input.required<FormGroup>();

  public sendDialogHide = output();

  public visible : boolean = true;

  private readonly _routineSvc = inject(RoutinesService);

  deleteRoutine(id: any) {
    if(id != undefined){
      this._routineSvc.deleteRoutine(id);
    }
    this.visible = false;
  }

  hideDialog(){
    this.sendDialogHide.emit();
  }
}
