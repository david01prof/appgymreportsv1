import { Component } from '@angular/core';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-objetive-weight',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule],
  templateUrl: './card-objetive-weight.component.html',
  styleUrl: './card-objetive-weight.component.scss'
})
export class CardObjetiveWeightComponent {

  public dataChart = [12,23,18,20,5,8,9];
}
