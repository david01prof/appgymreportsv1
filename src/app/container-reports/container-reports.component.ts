import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalStore } from '@app/store/global.store';
import { CardModule } from 'primeng/card';
import { ReportCardComponent } from "./components/report-card/report-card.component";

@Component({
  selector: 'app-container-reports',
  standalone: true,
  imports: [CommonModule,ReportCardComponent,RouterLink,CardModule],
  templateUrl: './container-reports.component.html',
  styleUrl: './container-reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerReportsComponent {

  public readonly store = inject(GlobalStore);

  public aplicarEstilo = true;
  public visible: boolean = false;

}
