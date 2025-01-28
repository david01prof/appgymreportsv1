import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { emptyReport, IMeasurement, IPhotos, IReport } from '@app/models';
import { GlobalService } from '@app/services/global.service';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { MessageService } from 'primeng/api';
import { ResumenCardComponent } from '../components/resumen-card/resumen-card.component';
import { ReportsPrimeModule } from '../reports-prime.module';
import { ReportsService } from '../services/reports.service';
import { CalculatorPgcComponent } from './calculator-pgc/calculator-pgc.component';
import { PhotosComponent } from './photos/photos.component';

@Component({
  selector: 'app-report-add-edit',
  standalone: true,
  imports: [
    ReportsPrimeModule,
    CalculatorPgcComponent,
    PhotosComponent,
    ResumenCardComponent,
    BreadcrumbComponent
  ],
  templateUrl: './report-add.component.html',
  styleUrl: './report-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportAddComponent {
  
  public readonly store = inject(GlobalReportStore);
  public readonly _reportSvc = inject(ReportsService);

  public reportToEdit = computed(() => emptyReport);
  public dataMeasurement = signal<IMeasurement>(this.reportToEdit().measurement);
  public dataPhotos = signal<IPhotos[]>(this.reportToEdit().photos);
  public dataReport = signal<IReport>(this.reportToEdit());
  public active: number = 0;
  public disabledPage: boolean = false;

  public readonly _globalSvc = inject(GlobalService);
  private readonly router = inject(Router);
  private readonly messageSvc = inject(MessageService);

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
      },
      { allowSignalWrites: true }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.disabledPage);
    
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

  getLabelNext(){
    if(window.innerWidth < 350){
      return '';
    }else{
      return 'Siguiente';
    }
  }

  getLabelBack(){
    if(window.innerWidth < 350){
      return '';
    }else{
      return 'Anterior';
    }
  }

  getLabelSave(){
    if(window.innerWidth < 350){
      return '';
    }else{
      return 'Guardar';
    }
  }

  async submit(report: IReport){
    const success = await this.store.addReport(report)

    if(success){
      this._globalSvc.toastSignal.set({ severity: 'success', summary: 'Operación realizada', detail: 'Reporte creado correctamente!', life: 2000 });
      this.router.navigate(['/reports']);
    }else{
      this.messageSvc.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al crear el reporte' });
    }
  }

  isActive(index: number,active: number){
    if(index <= active){
      return false;
    }else{
      return true;
    }
  }
}
