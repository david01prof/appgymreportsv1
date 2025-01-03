import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

import { RouterLink } from '@angular/router';
import { GlobalRoutinesStore } from '@app/store/globalRoutines.store';
import { CardModule } from 'primeng/card';
import { RoutinesService } from './components/cards-routines/services/routines.service';
import { CardsRoutinesComponent } from './components/cards-routines/cards-routines.component';


@Component({
  selector: 'app-container-routines',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbComponent,
    RouterLink,
    CardsRoutinesComponent
  ],
  templateUrl: './container-routines.component.html',
  styleUrl: './container-routines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerRoutinesComponent {
  // public selectedFilter: IFilter = { name: 'Titulo', code: 'title' };
  public readonly storeRoutines = inject(GlobalRoutinesStore);
  public readonly _routineSvc = inject(RoutinesService);

  public aplicarEstilo = true;

  // private safeData(data: IRoutine[]){
  //   this.data = data;
  //   this._routineSvc.safeData(data);
  //   this.selectedFilter = { name: 'Titulo', code: 'title' };
  // }

}
