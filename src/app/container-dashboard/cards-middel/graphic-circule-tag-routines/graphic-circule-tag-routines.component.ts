import { CommonModule } from '@angular/common';
import { Component, input, OnChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';
import { IRoutine } from '../../../../container-routines/interfaces/iroutine';
import { ITagsGraph } from '../../../registers/interfaces/iregister';

@Component({
  selector: 'app-graphic-circule-tag-routines',
  standalone: true,
  imports: [NgApexchartsModule, CardModule,CommonModule],
  templateUrl: './graphic-circule-tag-routines.component.html',
  styleUrl: './graphic-circule-tag-routines.component.scss',
})
export class GraphicCirculeTagRoutinesComponent implements OnChanges {

  routines = input.required<IRoutine[]>();

  public chartOptions: any | undefined;
  public collectionLengthTagsLabels :ITagsGraph[] = [];
  public collectionLabelsTags :string[] = [];
  public series: number[] = [];


  ngOnChanges(){

    this.calculateTagsRoutines();
    this.chartOptions = {
      series: this.series, // Valores para cada sección del donut
      chart: {
        type: 'donut',
        width: 200, // Tamaño del gráfico
        height: 200
      },
      labels: this.collectionLabelsTags, // Etiquetas
      legend: {
        position: 'bottom', // Cambia la posición de la leyenda (opcional)
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true
            }
          }
        }
      ]
    };
  }

  private calculateTagsRoutines(){

    for(let routine of this.routines()){
      
      if(this.collectionLabelsTags.length == 0){
        this.collectionLabelsTags.push(routine.tag);
        this.collectionLengthTagsLabels.push({label: routine.tag, contador: 1});
      }else{
        if(this.collectionLabelsTags.indexOf(routine.tag) == -1){
          this.collectionLabelsTags.push(routine.tag);
          this.collectionLengthTagsLabels.push({label: routine.tag, contador: 1});
        }else{
          let tagGraph : ITagsGraph | undefined = this.collectionLengthTagsLabels.find( (x: ITagsGraph) => x.label == routine.tag);
          if(tagGraph != undefined){
            tagGraph.contador++;
          }
          
        }
      }
    }

    this.getSerie();
  }

  private getSerie(){
    for(let serie of this.collectionLengthTagsLabels){
      this.series.push(serie.contador);
    }    
  }
}
