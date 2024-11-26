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

  public document : IRoutine | undefined;
  public dataChart = [20,40,45,80,65,90];

  private readonly _dashboardSvc = inject(DashboardService);


  ngOnInit() {
    this.getFirstItem();    
  }

  async getFirstItem() {
    try {
      const firstDoc = await this._dashboardSvc.getFirstDocument(APP_CONSTANTS.COLLECTION_NAME_ROUTINES);
      if (firstDoc) {
        this.document = firstDoc as IRoutine;
      } else {
        console.log('La colección está vacía.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
