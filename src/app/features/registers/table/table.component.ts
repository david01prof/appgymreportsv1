import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ResumenComponent } from '../steps-registers/resumen/resumen.component';

const PRIME_MODULES = [
  TableModule,
  ButtonModule,
  DialogModule,
  ConfirmDialogModule,
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, ResumenComponent],
  template: `
    <div class="card">
      <p-table
        [value]="data()"
        [tableStyle]="{ 'min-width': '25rem' }"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 20]"
      >
        <ng-template pTemplate="header">
          <tr>
            <th class="w-3 font-bold">Registros</th>
            <th class="w-4 font-bold">Fecha creación</th>
            <th class="w-1 font-bold text-center">Acciones</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-i="rowIndex">
          <tr>
            <td>Registro {{ i + 1 }}</td>
            <td>
              {{ transformDate(product.created) | date : 'short' | lowercase }}
            </td>
            <td class="flex justify-content-center gap-1">
              <p-button
                icon="pi pi-eye"
                (onClick)="showDialogResumen()"
              ></p-button>

              <p-dialog
                header="Detalle del registro {{ i + 1 }}"
                [modal]="true"
                [(visible)]="visible"
                [style]="{ width: '335px' }"
              >
                <app-resumen [register]="product" *ngIf="visible"></app-resumen>
              </p-dialog>
              <p-button icon="pi pi-trash" severity="danger" (click)="confirm1($event)"></p-button>
              <p-confirmDialog #cd>
                <ng-template pTemplate="headless" let-message>
                  <div
                    class="flex flex-column align-items-center p-5 surface-overlay border-round alignMargin"
                  >
                    <div
                      class="border-circle inline-flex justify-content-center align-items-center h-6rem w-6rem"
                    >
                      <i
                        class="pi pi-exclamation-triangle text-6xl text-red-300"
                      ></i>
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
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: `
    ::ng-deep .p-card{
      overflow: visible
    }
  `,
  providers: [ConfirmationService],
})
export class TableComponent {
  public data = input.required<any[]>();
  public visible: boolean = false;

  transformDate(date: number) {
    return new Date(date);
  }

  showDialogResumen() {
    this.visible = true;
  }

  constructor(private confirmationService: ConfirmationService) {}

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Quieres eliminar esta rutina?',
      header: 'Confirmacion',
      accept: () => {
        
       },
      reject: () => {},
    });
  }
}
