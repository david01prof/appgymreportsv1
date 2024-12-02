import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MenuItem, Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';
import { CardsMiddelComponent } from './cards-middel/cards-middel.component';
import { CardsTopComponent } from './cards-top/cards-top.component';
import { DashboardService } from './services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRegister } from '../registers/interfaces/iregister';
import { RegistersService } from '../registers/services/registers.service';
import { IRoutine } from '../routines/interfaces/iroutine';
import { RoutinesService } from '../routines/services/routines.service';

const PRIME_MODULES = [
  DialogModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  MessagesModule,
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PRIME_MODULES,
    CommonModule,
    BreadcrumbComponent,
    CardsTopComponent,
    CardsMiddelComponent,
    CardsBottomComponent,
    AnimateOnScrollModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  public date = new Date();
  public currentUrl: string = '';
  public visible: boolean = false;
  public itemsLabels: MenuItem[] = [];
  public messages: Message[] | undefined;
  public isVisible = false;
  public dataRoutine: IRoutine[] = [];
  public dataRegister: IRegister[] = [];

  private readonly _dashboardSvc = inject(DashboardService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _routineSvc = inject(RoutinesService);
  private readonly _registerSvc = inject(RegistersService);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.itemsLabels = this._dashboardSvc.getBreadcrumbLabels();

    this.messages = [
      {
        severity: 'secondary',
        detail:
          '👋 Hola! Bienvenido a Freya! Antes de empezar, por favor completa tu perfil para una mejor experiencia.',
      },
    ];

    this.getAllRoutines();
    this.getAllRegisters();
  }

  public getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.dataRoutine = [...routines]))
      )
      .subscribe();
  }

  public getAllRegisters() {
    this._registerSvc
      .getAllRegisters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((registers: IRegister[]) => (this.dataRegister = [...registers]))
      )
      .subscribe();
  }
}
