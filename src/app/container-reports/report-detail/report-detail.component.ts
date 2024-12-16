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

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [ResumenCardComponent, CardModule],
  template: `
    @defer (when reportSignal() != undefined) {
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
  readonly store = inject(GlobalReportStore);

  public reportSignal = signal<IReport>(emptyReport);

  ngOnChanges() {
    if (this.id() != undefined) {
      this.reportSignal.set(this.store['getReport'](this.id()!)!);
    }
  }
}
