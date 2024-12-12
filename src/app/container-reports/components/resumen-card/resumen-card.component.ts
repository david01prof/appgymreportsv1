import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { IReport } from '@app/models';
import { CarouselImagesComponent } from '@app/components/carousel-images/carousel-images.component';
import { CardModule } from 'primeng/card';

const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule,CardModule];

@Component({
  selector: 'app-resumen-card',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule,CarouselImagesComponent],
  templateUrl: './resumen-card.component.html',
  styleUrl: './resumen-card.component.scss',
})
export class ResumenCardComponent {
  
  public report = input.required<IReport>();
  public isDetail = input.required<boolean>();

  ngOnChanges(){
    console.log(this.report());
  }
  
}
