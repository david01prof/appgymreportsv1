import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ReportCardComponent } from "./components/report-card/report-card.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { ReportsService } from './services/reports.service';
import { GlobalReportStore } from '@app/store/globalReport.store';

@Component({
  selector: 'app-container-reports',
  standalone: true,
  imports: [CommonModule, ReportCardComponent, RouterLink, CardModule, BreadcrumbComponent],
  templateUrl: './container-reports.component.html',
  styleUrl: './container-reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerReportsComponent {

  public readonly store = inject(GlobalReportStore);
  public readonly _reportSvc = inject(ReportsService);

  public aplicarEstilo = true;
  public visible: boolean = false;

}
