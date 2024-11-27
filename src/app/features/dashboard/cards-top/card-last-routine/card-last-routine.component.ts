import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { APP_CONSTANTS } from '../../../../shared/constants';
import { IRoutine } from '../../../routines/interfaces/iroutine';
import { DashboardService } from '../../services/dashboard.service';
import { ApexCharLineLabelsComponent } from '../../../../components/apex-char-line-labels/apex-char-line-labels.component';

@Component({
  selector: 'app-card-last-routine',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-routine.component.html',
  styleUrl: './card-last-routine.component.scss'
})
export class CardLastRoutineComponent {

  public dataChart = [20,40,45,80,65,90];

}
