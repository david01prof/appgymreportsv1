import { Component, inject, input } from '@angular/core';
import { CarouselImagesComponent } from '@app/components/carousel-images/carousel-images.component';
import { ReportsPrimeModule } from '@app/container-reports/reports-prime.module';
import { Gender, IReport } from '@app/models';
import { GlobalService } from '@app/services';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-resumen-card',
  standalone: true,
  imports: [ReportsPrimeModule, CarouselImagesComponent],
  templateUrl: './resumen-card.component.html',
  styleUrl: './resumen-card.component.scss',
  providers: [ConfirmationService],
})
export class ResumenCardComponent {
  public report = input.required<IReport>();
  public isDetail = input.required<boolean>();
  public gender = Gender.FEMALE;

  public readonly _globalSvc = inject(GlobalService);
}
