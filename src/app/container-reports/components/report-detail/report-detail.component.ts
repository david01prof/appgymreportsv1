import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';
import { emptyReport, IReport } from '@app/models';
import { GlobalStore } from '@app/store/global.store';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [ResumenComponent, CardModule],
  template: `
    @defer (when reportSignal() != undefined) {
    <p-card class="custom-card fadein animation-duration-500">
      <app-resumen [report]="reportSignal()" [isDetail]="true"></app-resumen>
    </p-card>

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
