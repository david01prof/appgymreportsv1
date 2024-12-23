import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselImagesComponent } from '@app/components/carousel-images/carousel-images.component';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { IReport } from '@app/models';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule,CardModule,ConfirmDialogModule];

@Component({
  selector: 'app-resumen-card',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule,CarouselImagesComponent],
  templateUrl: './resumen-card.component.html',
  styleUrl: './resumen-card.component.scss',
  providers:[ConfirmationService]
})
export class ResumenCardComponent {
  
  public report = input.required<IReport>();
  public isDetail = input.required<boolean>();
  public readonly _reportSvc = inject(ReportsService);

  private readonly _confirmationSvc = inject(ConfirmationService);
  private readonly store = inject(GlobalReportStore);
  private readonly route = inject(Router);

  confirm2(event: Event) {
    this._confirmationSvc.confirm({
        target: event.target as EventTarget,
        message: 'Quieres borrar el reporte?',
        header: 'Borrar reporte ' + (this.report().idReport + 1),
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.store['removeReport'](this.report().id ?? 0);
            this.route.navigate(['/reports']);
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}
  
}
