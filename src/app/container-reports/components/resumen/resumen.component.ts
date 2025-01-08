import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { IReport } from '@app/models';
import { CarouselImagesComponent } from '@app/components/carousel-images/carousel-images.component';

const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule];

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule,CarouselImagesComponent],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss',
})
export class ResumenComponent {
  
  public report = input.required<IReport>();
  public isDetail = input.required<boolean>();
}
