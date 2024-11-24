import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { APP_CONSTANTS } from '../../../../shared/constants';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { IRoutine } from '../../../routines/interfaces/iroutine';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card-last-routine',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './card-last-routine.component.html',
  styleUrl: './card-last-routine.component.scss'
})
export class CardLastRoutineComponent {

  private readonly _dashboardSvc = inject(DashboardService);

  public document : IRoutine | undefined;

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
