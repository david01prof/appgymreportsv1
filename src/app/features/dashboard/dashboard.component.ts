import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { tap } from 'rxjs';
import { ApexChartLineGradientComponent } from "../components/apex-chart-line-gradient/apex-chart-line-gradient.component";
import { IRoutine } from '../routines/interfaces/iroutine';
import { RoutinesService } from '../routines/services/routines.service';
import { SparkboxsComponent } from '../components/sparkboxs/sparkboxs.component';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { DashboardService } from './services/dashboard.service';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,CardModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, ApexChartLineGradientComponent, SparkboxsComponent,BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  
  public date = new Date();
  public objetiveWeight: number = 78;
  public currentUrl: string = '';
  public visible: boolean = false;
  public data: IRoutine[] = [];
  public itemsLabels: MenuItem[] = [];

  private readonly _dashboardSvc = inject(DashboardService);
  private _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getAllRoutines();
    this.itemsLabels = this._dashboardSvc.getBreadcrumbLabels();
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
