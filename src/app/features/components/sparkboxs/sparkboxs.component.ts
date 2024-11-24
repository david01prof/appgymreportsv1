import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ApexCharLineLabelsComponent } from './apex-char-line-labels/apex-char-line-labels.component';
import { CardLastReportesComponent } from './card-last-reportes/card-last-reportes.component';
import { CardLastRoutineComponent } from './card-last-routine/card-last-routine.component';

@Component({
  selector: 'app-sparkboxs',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule,CommonModule,CardLastReportesComponent,CardLastRoutineComponent],
  templateUrl: './sparkboxs.component.html',
  styleUrl: './sparkboxs.component.scss'
})
export class SparkboxsComponent {

}
