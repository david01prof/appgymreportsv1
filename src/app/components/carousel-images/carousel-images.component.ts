import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IPhotos } from '@app/models';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-carousel-images',
  standalone: true,
  imports: [ImageModule,CarouselModule],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImagesComponent {
  public images = input.required<IPhotos[]>();

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
