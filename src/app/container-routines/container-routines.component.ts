import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

import { RouterLink } from '@angular/router';
import { GlobalRoutinesStore } from '@app/store/globalRoutines.store';
import { CardModule } from 'primeng/card';
import { RoutinesService } from './services/routines.service';
import { CardsRoutinesComponent } from './components/cards-routines/cards-routines.component';
import { FilterDataComponentsComponent } from '@app/components/filter-data-components/filter-data-components.component';
import { IFilter, IRoutine } from '@app/models';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { GlobalService } from '@app/services';


@Component({
  selector: 'app-container-routines',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbComponent,
    RouterLink,
    CardsRoutinesComponent,
    FilterDataComponentsComponent,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './container-routines.component.html',
  styleUrl: './container-routines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ContainerRoutinesComponent {
  public readonly store = inject(GlobalRoutinesStore);
  public readonly _routineSvc = inject(RoutinesService);
  public storeRoutines = signal<IRoutine[]>([]);

  public readonly messageService = inject(MessageService);

  public selectValue = signal<any>('');

  public dataInputSelect : IFilter[] = [
    { name: 'Titulo', code: 'title' },
    { name: 'Tag', code: 'tag' },
    { name: 'Favoritos', code: 'favourite' },
    { name: 'No favoritos', code: 'noFavourite' },
    { name: 'Fecha', code: 'date'}
  ]
  public dataToFilter = signal<any>('');
  public aplicarEstilo = true;

  private readonly globalSvc = inject(GlobalService);

  constructor(){
    effect(() => {
      this.storeRoutines.set(this.store.routines());
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit(){
    if(this.globalSvc.toastSignal() != null){
      this.messageService.add(this.globalSvc.toastSignal()); 
      this.globalSvc.toastSignal.set(null);
    }
  }
  
  filterData(data: any){
    this.dataToFilter.set(data);
    this.storeRoutines.set(this.store.routines());

    const filterTemp : IRoutine[] = [];
    if(this.selectValue().code.includes('title') && this.dataToFilter() != undefined){
      this.storeRoutines().map((routine: IRoutine) => {
        if(routine.titleRoutine.includes(this.dataToFilter())){
          filterTemp.push(routine);
        }
      })
      this.storeRoutines.set([...filterTemp]);
    }else if(this.selectValue().code.includes('tag') && this.dataToFilter() != undefined){
      this.storeRoutines().map((routine: IRoutine) => {
        if(routine.tag.title?.includes(this.dataToFilter())){
          filterTemp.push(routine);
        }
      })
      this.storeRoutines.set([...filterTemp]);
    }else if(this.selectValue().code.includes('favourite')){
      this.storeRoutines().map((routine: IRoutine) => {
        if(routine.favourite == true){
          filterTemp.push(routine);
        }
      })
      this.storeRoutines.set([...filterTemp]);
    }else if(this.selectValue().code.includes('noFavourite')){
      this.storeRoutines().map((routine: IRoutine) => {
        if(routine.favourite == false){
          filterTemp.push(routine);
        }
      })
      this.storeRoutines.set([...filterTemp]);
    }else{
      if(this.dataToFilter().length == 2 && this.dataToFilter()[0] != null && this.dataToFilter()[1] != null && this.dataToFilter().length == 2){
        this.storeRoutines().forEach((routine: IRoutine) => {
          const dateCreated = new Date(routine.created);
          if( dateCreated >= this.dataToFilter()[0] && dateCreated <= this.dataToFilter()[1]){
            filterTemp.push(routine);
          }
        });
      }
      this.storeRoutines.set([...filterTemp]);
    }
    
  }
}
