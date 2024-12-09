import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IPhotos } from '@app/models';
import { ImageModule } from 'primeng/image';
import { SpinnerLoaderComponent } from '../spinner-loader/spinner-loader.component';

@Component({
  selector: 'app-carousel-images',
  standalone: true,
  imports: [ImageModule,SpinnerLoaderComponent],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselImagesComponent {

  public images = input.required<IPhotos[]>();

}
