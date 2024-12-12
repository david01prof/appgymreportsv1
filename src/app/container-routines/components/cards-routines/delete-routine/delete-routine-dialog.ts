import { Component, inject, input, output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RoutinesService } from '../services/routines.service';

@Component({
  selector: 'app-delete-routine-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService],
  template: `
          <p-confirmDialog #cd>
            <ng-template pTemplate="headless" let-message>
              <div
                class="flex flex-column align-items-center p-5 surface-overlay border-round alignMargin"
              >
                <div
                  class="border-circle inline-flex justify-content-center align-items-center h-6rem w-6rem"
                >
                  <i class="pi pi-exclamation-triangle text-6xl text-red-300"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-2">
                  {{ message.header }}
                </span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex align-items-center gap-2 mt-4">
                  <button
                    pButton
                    label="Eliminar"
                    (click)="cd.accept()"
                    class="w-8rem p-button-outlined"
                    severity="danger"
                  ></button>
                  <button
                    pButton
                    label="Cancelar"
                    (click)="cd.reject()"
                    class="p-button-outlined w-8rem"
                  ></button>
                </div>
              </div>
            </ng-template>
          </p-confirmDialog>

          <i
            class="pi pi-trash text-red-400 text-md mr-3 ml-2"
            (click)="confirm1($event)"
          ></i>
  `,
  styles: `
  `
})
export class DeleteRoutineDialog {

  forms = input.required<any>();
  isVisible = output<boolean>()

  private readonly _routineSvc = inject(RoutinesService);
  private readonly _confirmationSvc = inject(ConfirmationService);

  confirm1(event: Event) {
    this._confirmationSvc.confirm({
      target: event.target as EventTarget,
      message: 'Quieres eliminar esta rutina?',
      header: 'Confirmacion',
      accept: () => {this._routineSvc.deleteRoutine(this.forms().value.id)
        this.isVisible.emit(false); 
       },
      reject: () => {},
    });
  }
}
