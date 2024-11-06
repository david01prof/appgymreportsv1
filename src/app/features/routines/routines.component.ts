import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IRoutine } from './iroutine';
import { NewRoutineComponent } from './new-routine/new-routine.component';
import { RoutinesService } from './routines.service';

const PRIME_MODULES = [ButtonModule, DialogModule,CardModule,SidebarModule,TagModule,InputTextModule];
@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [PRIME_MODULES, NewRoutineComponent, CommonModule,BreadcrumbComponent,ReactiveFormsModule],
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
  public searchControl = new FormControl('');

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
