import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRoutine } from './iroutine';
import { RoutinesService } from './routines.service';
import { ButtonModule } from 'primeng/button';
import { NewEditComponent } from './new_edit/new_edit.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

const PRIME_MODULES = [ButtonModule, DialogModule,CardModule,SidebarModule];
@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [ListComponent, PRIME_MODULES, NewEditComponent, CommonModule,BreadcrumbComponent],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent implements OnInit {
  public visible: boolean = false;
  public data : IRoutine[] = [];
  public chargeComponent: boolean = false;
  public item !: IRoutine;
  public items = [
    { icon: 'pi pi-home', route: '/routines' },
    { label: 'Rutinas'  }
  ];

  private readonly _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);

  sidebarVisible4: boolean = false;

  ngOnInit(): void {
    this.getAllRoutines();
  }

  showDialog() {
    this.visible = true;
    this.chargeComponent = true;
  }

  getValueSubmit(e:any){
    this.visible = false;
  }

  getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.data = [...routines]))
      )
      .subscribe();
  }

  checkActiveCard(item: IRoutine) {
    this.sidebarVisible4 = true;
    this.item = item;
    this.chargeComponent = true;
  }

  handleSidebarHide(){
    this.sidebarVisible4 = false;
    this.chargeComponent = false;
  }
}
