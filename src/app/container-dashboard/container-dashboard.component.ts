import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { DashboardService } from '@app/container-dashboard/services/dashboard.service';
import { IRoutine } from '@app/container-routines/interfaces/iroutine';
import { IRegister } from '@app/reports/interfaces/iregister';
import { RegistersService } from '@app/reports/services/registers.service';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MenuItem, Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { tap } from 'rxjs';
import { RoutinesService } from '@app/container-routines/components/cards-routines/services/routines.service';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';
import { CardsMiddelComponent } from './cards-middel/cards-middel.component';
import { CardsTopComponent } from './cards-top/cards-top.component';

const PRIME_MODULES = [
  DialogModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  MessagesModule,
];

@Component({
  selector: 'app-container-dashboard',
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
  templateUrl: './container-dashboard.component.html',
  styleUrl: './container-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerDashboardComponent {

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
    this._routineSvc.getAllRoutines()
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
