import { Component } from '@angular/core';
import { TableStripedRowsComponent } from '../../../components/table-striped-rows/table-striped-rows.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cards-bottom',
  standalone: true,
  imports: [TableStripedRowsComponent,CardModule],
  template: `
    <div class="tables mt-7">
      <p-card class="tableA" header="Registros">
      <app-table-striped-rows ></app-table-striped-rows>
      </p-card>
      
      <p-card class="tableB" header="Rutinas">
      <app-table-striped-rows ></app-table-striped-rows>
      </p-card>
      
    </div>
  `,
  styleUrl: './cards-bottom.component.scss',
})
export class CardsBottomComponent {}
