import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { IMeasurement } from '../../features/registers/interfaces/imeasurement';
import { IRegister } from '../../features/registers/interfaces/iregister';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tree-table',
  standalone: true,
  imports: [TreeTableModule, CommonModule],
  template: `
    <div class="card">
      <p-treeTable
        [value]="files"
        [columns]="cols"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 25]"
        [scrollable]="true"
        [tableStyle]="{ 'min-width': '50rem' }"
      >
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template
          pTemplate="body"
          let-rowNode
          let-rowData="rowData"
          let-columns="columns"
        >
          <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
              <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </p-treeTable>
    </div>
  `,
  styles: ``,
})
export class TreeTableComponent {
  data = input.required<IRegister[]>();
  files: TreeNode[] = [];

  cols!: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'pgc', header: 'Indice PGC' },
    ];
  }

  ngOnChanges() {
    if (this.data().length > 0) {
      for (let i = 0; i < this.data().length; i++) {
        let node = {
          data: {
            nombre: 'Registro ' + i,
            fecha: new Date(),
            pgc: 'Type ' + i,
          },
          children: [
            {
              data: {
                nombre: 'Item ' + i + ' - 0',
                fecha: new Date(),
                pgc: 'Type ' + i,
              },
            },
          ],
        };
        console.log(node);
        
        this.files.push(node);
      }
    }
  }
}
