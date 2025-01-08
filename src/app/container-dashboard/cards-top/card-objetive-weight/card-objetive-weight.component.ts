import { Component, input } from '@angular/core';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { IReport } from '@app/models';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-objetive-weight',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule],
  templateUrl: './card-objetive-weight.component.html',
  styleUrl: './card-objetive-weight.component.scss'
})
export class CardObjetiveWeightComponent {

  objetiveWeight  = input.required<number>();
  actualWeight = input.required<number>();
  reports = input.required<IReport[]>();

  public dataChart : number[] = [0];

  ngOnChanges(){
    if(this.reports().length > 0){
      for(let report of this.reports()){
        this.dataChart.push(report.measurement.weight)
      }      
    }
  }
}
