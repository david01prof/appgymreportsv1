import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { IReport } from '@app/models';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

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
  public dataChart = signal<number[]>([0]);
  
  ngOnChanges(){
    if(this.reports().length > 0 ){
      let ref :number[]= [0];
      for(let report = 0; report < this.reports().length; report++){
        ref.push(1);
      }
      this.dataChart.set(ref);
    }
  }
  
  public getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
