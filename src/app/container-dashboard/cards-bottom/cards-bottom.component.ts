import { Component, input } from '@angular/core';
import { TableStripedRowsComponent } from '@app/components/table-striped-rows/table-striped-rows.component';
import { IReport } from '@app/models';
import { IRoutine } from '@app/models/iroutine';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-cards-bottom',
  standalone: true,
  imports: [TableStripedRowsComponent,CardModule],
  template: `
    <div class="tables mt-7 fadein animation-duration-1000">
      <p-card class="tableA" header="Reportes">
      <app-table-striped-rows [columns]="columReports" [isRegister]="true" [products]="productReports()" ></app-table-striped-rows>
      </p-card>
      
      <p-card class="tableB" header="Rutinas">
      <app-table-striped-rows [columns]="columnsRoutines" [isRegister]="false" [products]="productRoutines()" ></app-table-striped-rows>
      </p-card>
      
    </div>
  `,
  styleUrl: './cards-bottom.component.scss',
})
export class CardsBottomComponent {

  productRoutines = input.required<IRoutine[]>();
  productReports = input.required<IReport[]>();

  public columnsRoutines = [
    { id: 'titleRoutine', label: 'Titulo' },
    { id: 'numExercises', label: 'Num. de ejercicios' },
    { id: 'exercises', label: 'Ejercicios' },
    { id: 'date', label: 'Fecha' },
    { id: 'tag', label: 'Etiqueta' },
    { id: 'actions', label: 'Acciones' },
  ]

  public columReports = [
    { id: 'id', label: 'Id' },
    // { id: 'totaligc', label: 'Total IgC' },
    { id: 'created', label: 'Fecha de registro' },
    { id: 'actions', label: 'Acciones' },
  ]
}
