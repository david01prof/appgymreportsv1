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
import { emptyUser, Gender, IReport, IUser } from '@app/models';
import { IRoutine } from '@app/models/iroutine';
import { GlobalService } from '@app/services';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { tap } from 'rxjs';
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
    MessageModule
  ],
  templateUrl: './container-dashboard.component.html',
  styleUrl: './container-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerDashboardComponent {

  public itemsLabels: MenuItem[] = [];
  public dataRoutine = signal<IRoutine[]>([]);
  public dataReports = signal<IReport[]>([]);
  public activeUser = signal<IUser>(emptyUser);
  public actualWeight = 0;
  public objetiveWeight = 0;
  public genreUser = '';
  
  public readonly _globalSvc = inject(GlobalService);

  private readonly _dashboardSvc = inject(DashboardService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _routineSvc = inject(RoutinesService);
  private readonly _reportSvc = inject(ReportsService);


  constructor(){
    effect(() => {
      if(this._globalSvc.userInfo().email != ''){
        this.itemsLabels = this._dashboardSvc.getBreadcrumbLabels();
    
        if(this._globalSvc.userInfo().actualWeight == 0 && this._globalSvc.userInfo().objetiveWeight == 0){
          this.genreUser =  'Bienvenido'
          if(this._globalSvc.userInfo().gender.code == Gender.MALE){
            this.genreUser = 'Bienvenido'
          }else if(this._globalSvc.userInfo().gender.code == Gender.FEMALE){
            this.genreUser = 'Bienvenida'
          }
        }

        this.actualWeight = this._globalSvc.userInfo().actualWeight;
        this.objetiveWeight = this._globalSvc.userInfo().objetiveWeight;
        this.getAllRoutines();
        this.getAllReports();
      }
    });
  }
  ngOnInit(): void {
    
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
