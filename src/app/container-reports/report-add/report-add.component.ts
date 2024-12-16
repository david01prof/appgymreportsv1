import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { emptyReport, IMeasurement, IPhotos, IReport } from '@app/models';
import { GlobalService } from '@app/services/global.service';
import { GlobalStore } from '@app/store/global.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ResumenCardComponent } from '../components/resumen-card/resumen-card.component';
import { ReportsService } from '../services/reports.service';
import { CalculatorPgcComponent } from './calculator-pgc/calculator-pgc.component';
import { PhotosComponent } from './photos/photos.component';

const PRIME_MODULES = [CardModule, StepperModule, ButtonModule];

@Component({
  selector: 'app-report-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    PRIME_MODULES,
    CalculatorPgcComponent,
    PhotosComponent,
    ResumenCardComponent,
    RouterLink,
    BreadcrumbComponent
  ],
  templateUrl: './report-add.component.html',
  styleUrl: './report-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportAddComponent {
  
  public readonly store = inject(GlobalStore);
  public readonly _reportSvc = inject(ReportsService);

  public reportToEdit = computed(() => emptyReport);
  public dataMeasurement = signal<IMeasurement>(
    this.reportToEdit().measurement
  );
  public dataPhotos = signal<IPhotos[]>(this.reportToEdit().photos);
  public dataReport = signal<IReport>(this.reportToEdit());
  public active: number = 0;
  public disabledPage: boolean = false;

  private readonly _globalSvc = inject(GlobalService);

  constructor() {
    effect(
      () => {
        const measurement = this.dataMeasurement();
        const photos = this.dataPhotos();
        this.dataReport.set({
          idReport: this.getId(),
          created: new Date().getTime(),
          measurement: measurement,
          photos: photos,
        });

        this.disabledPage = this._globalSvc.sharedSignal();
      },
      { allowSignalWrites: true }
    );
  }

  getId() {
    if (this.store.reports().length == 0) {
      return 0;
    } else {
      if (this.store.reports().length > 0) {
        const report = this.store.reports()[0];
        return report.idReport! + 1;
      }
      return 0;
    }
  }
  getValuePhotos(e: any) {
    this.dataPhotos.set(e);
  }

  getValueMeasurement(e: any) {
    this.dataMeasurement.set(e);
    this.disabledPage = false;
    this._globalSvc.updateSignal(false);
  }

  disabledNextPage(e: boolean) {
    this.disabledPage = e;
  }

  activeInputImage(e: boolean){
    this.disabledPage = e;
  }
}
