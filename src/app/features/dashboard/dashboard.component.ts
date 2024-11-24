import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IRoutine } from '../routines/interfaces/iroutine';
import { RoutinesService } from '../routines/services/routines.service';
import { CardsMiddelComponent } from './cards-middel/cards-middel.component';
import { CardsTopComponent } from './cards-top/cards-top.component';
import { DashboardService } from './services/dashboard.service';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,CardModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule,BreadcrumbComponent,CardsTopComponent,CardsMiddelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  
  public date = new Date();
  public currentUrl: string = '';
  public visible: boolean = false;
  public itemsLabels: MenuItem[] = [];

  private readonly _dashboardSvc = inject(DashboardService);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.itemsLabels = this._dashboardSvc.getBreadcrumbLabels();
  }
}
