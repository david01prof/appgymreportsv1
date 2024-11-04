import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  template: `
    <div class="card">
      <p-table [value]="data()" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let column of columns()">{{ column }}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>

          <tr>
            <td *ngFor="let column of columns()">
              @if (column != 'totaligc' && column != 'photos') {
              {{ product[column] }}
              } @else if( column == 'totaligc') {
              {{ product[0]['calculator'][column] }}
              }@else if( column == 'photos') {
              {{ product[0][column].length | json }}
              }
            </td>
          </tr>
          
        </ng-template>
      </p-table>
    </div>
  `,
  styles: ``,
})
export class TableComponent {
  public columns = input<string[]>();
  public data = input.required<any[]>();

  ngOnChanges(): void {
    console.log(this.data());
  }
}
