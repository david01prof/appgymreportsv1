import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { APP_CONSTANTS } from '../../../../shared/constants';
import { IRegister } from '../../../registers/interfaces/iregister';
import { DashboardService } from '../../services/dashboard.service';
import { ApexCharLineLabelsComponent } from '../card-objetive-weight/apex-char-line-labels/apex-char-line-labels.component';

@Component({
  selector: 'app-card-last-reportes',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-reportes.component.html',
  styleUrl: './card-last-reportes.component.scss'
})
export class CardLastReportesComponent {

  private readonly _dashboardSvc = inject(DashboardService);

  public document : IRegister | undefined;

  ngOnInit() {
    this.getFirstItem();
  }

  async getFirstItem() {
    try {
      const firstDoc = await this._dashboardSvc.getFirstDocument(APP_CONSTANTS.COLLECTION_NAME_REGISTERS);
      if (firstDoc) {
        this.document = firstDoc as IRegister;
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
