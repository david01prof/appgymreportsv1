import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  template: `
<div class="card">
    <p-table [value]="data()" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.titleRoutine }}</td>
                <td>{{ product.numExercises }}</td>
                <td>{{ product.date }}</td>
                <td>{{ product.status }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>
  `,
  styles: ``
})
export class TableComponent {

  public data = input.required<any[]>();

  ngOnChanges(): void {
    console.log(this.data());
  }
}
