import { Component, input } from '@angular/core';
import { TableStripedRowsComponent } from '../../../components/table-striped-rows/table-striped-rows.component';
import { CardModule } from 'primeng/card';
import { IRoutine } from '../../routines/interfaces/iroutine';
import { IRegister } from '../../registers/interfaces/iregister';

@Component({
  selector: 'app-cards-bottom',
  standalone: true,
  imports: [TableStripedRowsComponent,CardModule],
  template: `
    <div class="tables mt-7 fadein animation-duration-1000">
      <p-card class="tableA" header="Registros">
      <app-table-striped-rows [columns]="columnsRegisters" [isRegister]="true" [products]="productRegisters()" ></app-table-striped-rows>
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
  productRegisters = input.required<IRegister[]>();

  public columnsRoutines = [
    { id: 'titleRoutine', label: 'Titulo' },
    { id: 'numExercises', label: 'Num. de ejercicios' },
    { id: 'exercises', label: 'Ejercicios' },
    { id: 'date', label: 'Fecha' },
    { id: 'tag', label: 'Etiqueta' },
    { id: 'actions', label: 'Acciones' },
  ]

  public columnsRegisters = [
    { id: 'id', label: 'Id' },
    { id: 'totaligc', label: 'Total IgC' },
    { id: 'created', label: 'Fecha de registro' },
    { id: 'actions', label: 'Acciones' },
  ]
}
