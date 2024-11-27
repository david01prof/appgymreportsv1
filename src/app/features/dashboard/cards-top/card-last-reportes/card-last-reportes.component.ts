import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { APP_CONSTANTS } from '../../../../shared/constants';
import { IRegister } from '../../../registers/interfaces/iregister';
import { DashboardService } from '../../services/dashboard.service';
import { ApexCharLineLabelsComponent } from '../../../../components/apex-char-line-labels/apex-char-line-labels.component';

@Component({
  selector: 'app-card-last-reportes',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-reportes.component.html',
  styleUrl: './card-last-reportes.component.scss'
})
export class CardLastReportesComponent {

  public document : IRegister | undefined;
  public dataChart = [10,30,45,20,65,50];

  private readonly _dashboardSvc = inject(DashboardService);
  

  public getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
