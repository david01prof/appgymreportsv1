import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ApexCharLineLabelsComponent } from './apex-char-line-labels/apex-char-line-labels.component';

@Component({
  selector: 'app-card-objetive-weight',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule],
  templateUrl: './card-objetive-weight.component.html',
  styleUrl: './card-objetive-weight.component.scss'
})
export class CardObjetiveWeightComponent {

}
