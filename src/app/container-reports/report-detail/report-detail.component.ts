import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import { emptyReport, IReport } from '@app/models';
import { GlobalStore } from '@app/store/global.store';
import { CardModule } from 'primeng/card';
import { ResumenCardComponent } from '../components/resumen-card/resumen-card.component';

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
      margin: 2rem 20%;
    }

    @media (max-width: 578px) {
      .custom-card{
        width: 100%;
        margin: 2rem 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent {
  public id = input<number>();
  readonly store = inject(GlobalStore);

  public reportSignal = signal<IReport>(emptyReport);

  ngOnChanges() {
    if (this.id() != undefined) {
      this.reportSignal.set(this.store['getReport'](this.id()!)!);
    }
  }
}
