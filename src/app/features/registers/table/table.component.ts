import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule,ButtonModule],
  template: `
    <div class="card">
      <p-table [value]="data()" [tableStyle]="{ 'min-width': '25rem' }" [paginator]="true"
      [rows]="5" [rowsPerPageOptions]="[5, 10, 20]">
        <ng-template pTemplate="header">
        <tr>
            <th class="w-3 font-bold">Registro</th>
            <th class="w-4 font-bold">Fecha creación</th>
            <th class="w-1 font-bold text-center">Acciones</th>
        </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-i="rowIndex">
          <tr>
            <td>Registro {{ i + 1}}</td>
            <td>{{transformDate(product.created) | date: "short" | lowercase}}</td>
            <td class="flex justify-content-center gap-1">
              <p-button icon="pi pi-eye" ></p-button>
              <p-button icon="pi pi-trash" severity="danger"></p-button>
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
})
export class TableComponent {
  public columns = input<string[]>();
  public data = input.required<any[]>();

  ngOnChanges(): void {
    console.log(this.data());
  }

  transformDate(date: number) {
    return new Date(date)
  }
}
