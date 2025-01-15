import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselImagesComponent } from '@app/components/carousel-images/carousel-images.component';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { IReport } from '@app/models';
import { GlobalService } from '@app/services';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  private readonly _globalSvc = inject(GlobalService);
  private readonly messageSvc = inject(MessageService);

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

        accept: async () => {
            const success = await this.store.removeReport(this.report().id ?? 0);

            if(success){
              this._globalSvc.toastSignal.set({ severity: 'success', summary: 'Operación realizada', detail: 'Reporte eliminado correctamente!', life: 2000 });
              this.route.navigate(['/reports']);
            }else{
              this.messageSvc.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al eliminar el reporte' });
            }
        }
    });
}
  
}
