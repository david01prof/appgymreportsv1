import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ChartLinearComponent } from '../../components/chart/chartLinear.component';
import { TableComponent } from '../../components/table/table.component';
import { IRoutine } from '../routines/iroutine';
import { RoutinesService } from '../routines/routines.service';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,CardModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule,ChartLinearComponent,TableComponent,BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  
  public date = new Date();
  public objetiveWeight: number = 78;
  public currentUrl: string = '';
  public visible: boolean = false;
  public data: IRoutine[] = [];
  public items = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Dashboard'  }
  ];

  private _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getAllRoutines()
  }

  ngAfterViewInit(): void {
    // this.visible = true;
    console.log(this.visible);
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
  }



  showDialog() {
    this.visible = true;
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
}
