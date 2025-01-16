import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { IReport } from '@app/models';
import { GlobalService } from '@app/services';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-objetive-weight',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule,CommonModule],
  templateUrl: './card-objetive-weight.component.html',
  styleUrl: './card-objetive-weight.component.scss'
})
export class CardObjetiveWeightComponent {

  objetiveWeight  = input.required<number>();
  actualWeight = input.required<number>();
  reports = input.required<IReport[]>();

  public dataChart = signal<number[]>([0]);
  public improvements = signal<number>(0);
  public isPositive = signal<boolean>(false);
  public actualWeightN = 0;

  private readonly _globalSvc = inject(GlobalService);

  constructor() {
    effect(() => {
      if(this._globalSvc.userInfo().actualWeight != 0){
        this.actualWeightN = this._globalSvc.userInfo().actualWeight;
      }

    });
  }

  ngOnChanges(){
    this.actualWeightN = this.actualWeight();
    if(this.reports().length > 0){
      let ref :number[]= [];
      for(let report of this.reports()){
        ref.push(report.measurement.weight)
      } 

      ref = ref.reverse();
      const  improvements = this.calculateImprovement(this._globalSvc.userInfo().objetiveWeight, ref);
      this.improvements.set(parseInt(improvements[improvements.length - 1].toString()));
      this.dataChart.set(ref);

      let lastValue = 0
      improvements.map((value: number) => {
        if(value > lastValue){
          this.isPositive.set(false);
        }else{
          this.isPositive.set(true);
        }
        lastValue = value;  
       });
    }


  }

  private calculateImprovement(baseValue: number, values: number[]): number[] {
    return values.map(value => ((value - baseValue) / baseValue) * 100);
  }
}
