import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import { emptyReport, IReport } from '@app/models';
import { CardModule } from 'primeng/card';
import { ResumenCardComponent } from '../components/resumen-card/resumen-card.component';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [ResumenCardComponent, CardModule,BreadcrumbComponent],
  template: `
    @defer (when reportSignal() != undefined) {
      <app-breadcrumb [itemsLabels]="_reportSvc.getBreadcrumbLabelsResumen()" urlActive="reports"></app-breadcrumb>
      <app-resumen-card [report]="reportSignal()" [isDetail]="true" class="custom-card"></app-resumen-card>
    }
  `,
  styles: `
    .custom-card{
      width: 60%;
      display: inline-block;
      margin: 1rem 20%;
    }

    @media (max-width: 578px) {
      .custom-card{
        width: 100%;
        margin: 1rem 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent {

  public id = input<number>();
  public reportSignal = signal<IReport>(emptyReport);

  public readonly _reportSvc = inject(ReportsService);
  private readonly store = inject(GlobalReportStore);
  
  ngOnChanges() {
    if (this.id() != undefined) {
      this.reportSignal.set(this.store['getReport'](this.id()!)!);
    }
  }
}
