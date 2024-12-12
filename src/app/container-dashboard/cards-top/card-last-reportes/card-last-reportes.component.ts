import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { DashboardService } from '@app/container-dashboard/services/dashboard.service';
import { IReport } from '@app/models';

@Component({
  selector: 'app-card-last-reportes',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-reportes.component.html',
  styleUrl: './card-last-reportes.component.scss'
})
export class CardLastReportesComponent {

  reports = input.required<IReport[]>();

  public document : IReport | undefined;
  public dataChart = [10,30,45,20,65,50];

  private readonly _dashboardSvc = inject(DashboardService);
  

  public getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
