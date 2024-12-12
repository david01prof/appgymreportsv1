import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { tap } from 'rxjs';
import { CardsRoutinesComponent } from './components/cards-routines/cards-routines.component';
import { DialogDetailComponent } from './components/cards-routines/dialog-detail/dialog-detail.component';
import { RoutinesService } from './components/cards-routines/services/routines.service';
import { IFilter } from '../models/ifilter';
import { IRoutine } from '../models/iroutine';

const PRIME_MODULES = [
  ButtonModule,
  CardModule,
  SidebarModule,
  TagModule,
  InputTextModule,
  DividerModule,
  DialogModule,
  BreadcrumbModule,
  DropdownModule
];

@Component({
  selector: 'app-container-routines',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PRIME_MODULES,
    BreadcrumbComponent,
    CardsRoutinesComponent,
    DialogDetailComponent,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './container-routines.component.html',
  styleUrl: './container-routines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerRoutinesComponent {
  public data: IRoutine[] = [];
  public chargeComponent: boolean = false;
  public item!: IRoutine;
  public searchControl = new FormControl('');
  public activeForm!: FormGroup;
  public visible: boolean = false;
  public itemsLabels : MenuItem[] = [];
  public itemsFilter:  IFilter[] = [];
  public selectedFilter: IFilter = { name: 'Titulo', code: 'title' };
  public date: Date[] | undefined;

  private readonly _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.getAllRoutines();
    this.itemsLabels = this._routineSvc.getBreadcrumbLabels();
    this.itemsFilter = this._routineSvc.getItemsFilter();
  }

  public getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.safeData([...routines])))
      )
      .subscribe();
  }

  private safeData(data: IRoutine[]){
    this.data = data;
    this._routineSvc.safeData(data);
    this.selectedFilter = { name: 'Titulo', code: 'title' };
  }

  public getActiveItem(e: IRoutine) {
    this.chargeComponent = true;
    this.visible = true;
    this.item = e;
  }

  public getValueHideDialog() {
    this.chargeComponent = false;
    this.visible = false;
  }

  public getValueFilter(){

    if(this.searchControl.value!.length === 0 && this.selectedFilter.code !== 'favorites' && this.selectedFilter.code !== 'nofavorites' && this.selectedFilter.code !== 'date'){
      this.data = this._routineSvc.getSafeData()
    }else{

      switch(this.selectedFilter.code){
        case 'title': 
          this.data = this.data.filter( (item : IRoutine) => item.titleRoutine.includes(this.searchControl.value!));
          break;
        case 'favorites':
          this.data = this._routineSvc.getSafeData()
          this.data = this.data.filter( (item : IRoutine) => item.favourite === true);
          break;
        case 'nofavorites':
          this.data = this._routineSvc.getSafeData()
          this.data = this.data.filter( (item : IRoutine) => item.favourite === false);
          break;
        case 'tag':
          this.data = this.data.filter( (item : IRoutine) => item.tag.includes(this.searchControl.value!));
          break;
        case 'date':
          if(this.date != undefined && this.date.length >= 0 && this.date[1] != null){
            this.data = this._routineSvc.getSafeData();
            let timestampA = `${this.date[0].getTime()}`;
            let timestampB = `${this.date[1].getTime()}`;
            
            this.data = this.data.filter( (item : IRoutine) =>
              parseInt(`${item.date.seconds}000`) >= parseInt(timestampA) && parseInt(`${item.date.seconds}000`) <= parseInt(timestampB)
            );
          }
          break;
      }
      
    }
    
  }
}
