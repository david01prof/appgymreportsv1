import { Component } from '@angular/core';
import { ApexCharLineLabelsComponent } from '../apex-char-line-labels/apex-char-line-labels.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sparkboxs',
  standalone: true,
  imports: [ApexCharLineLabelsComponent,CardModule,CommonModule],
  templateUrl: './sparkboxs.component.html',
  styleUrl: './sparkboxs.component.scss'
})
export class SparkboxsComponent {

}
