import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { DashboardService } from '@app/container-dashboard/services/dashboard.service';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { RoutinesService } from '@app/container-routines/services/routines.service';
import { emptyUser, IReport, IUser } from '@app/models';
import { IRoutine } from '@app/models/iroutine';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MenuItem, Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { tap } from 'rxjs';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';
import { CardsMiddelComponent } from './cards-middel/cards-middel.component';
import { CardsTopComponent } from './cards-top/cards-top.component';
import { GlobalService } from '@app/services';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerDashboardComponent {
  public date = new Date();
  public currentUrl: string = '';
  public visible: boolean = false;
  public itemsLabels: MenuItem[] = [];
  public messages: Message[] | undefined;
  public isVisible = false;
  public dataRoutine = signal<IRoutine[]>([]);
  public dataReports = signal<IReport[]>([]);
  public activeUser = signal<IUser>(emptyUser);
  public isActive = signal(false);
  public readonly _globalSvc = inject(GlobalService);

  private readonly _dashboardSvc = inject(DashboardService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _routineSvc = inject(RoutinesService);
  private readonly _reportSvc = inject(ReportsService);
  

  constructor() {
    effect(() => {
      this.activeUser.set(this._globalSvc.userInfo());

      if(this._globalSvc.userInfo().actualWeight == 0 && this._globalSvc.userInfo().objetiveWeight == 0){
        this.isActive.set(true);
      }else{
        this.isActive.set(false);
      }
    }, { allowSignalWrites: true });


  }

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
    this.getAllReports();
  }

  public getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => this.dataRoutine.set([...routines]))
      )
      .subscribe();
  }

  public getAllReports() {
    this._reportSvc
      .getAllReports()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((reports: IReport[]) => this.dataReports.set([...reports]))
      )
      .subscribe();
  }
}
