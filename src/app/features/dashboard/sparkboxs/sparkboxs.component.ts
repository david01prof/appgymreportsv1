import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ApexCharLineLabelsComponent } from '../../../components/apex-char-line-labels/apex-char-line-labels.component';
import { CardLastReportesComponent } from '../cards-top/card-last-reportes/card-last-reportes.component';
import { CardLastRoutineComponent } from './card-last-routine/card-last-routine.component';

@Component({
  selector: 'app-card-objetive-weight',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule,CommonModule],
  templateUrl: './cardbjetiveWeight.component.html',
  styleUrl: './sparkboxs.component.scss'
})
export class CardObjetiveWeight {

}
