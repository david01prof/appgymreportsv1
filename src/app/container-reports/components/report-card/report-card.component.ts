import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsPrimeModule } from '@app/container-reports/reports-prime.module';
import { IReport } from '@app/models';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [ReportsPrimeModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService]
})
export class ReportCardComponent {
  
  public report = input.required<IReport>();
  public items: MenuItem[] | undefined;

  private readonly store = inject(GlobalReportStore);
  private readonly router = inject(Router);
  private readonly _confirmationSvc = inject(ConfirmationService);
  private readonly messageSvc = inject(MessageService);

  ngOnInit() {
    this.items = [
        {
            label: 'Acciones',
            items: [
                {
                    label: 'Detalle',
                    icon: 'pi pi-eye',
                    command: () => {
                      this.router.navigate(['/reports',{ outlets: { content: [this.report().id] } }]);
                    }
                },
                {
                    label: 'Eliminar',
                    icon: 'pi pi-trash',
                    command: () => {
                      this._confirmationSvc.confirm({
                        message: 'Quieres borrar el reporte ' + (this.report().idReport + 1) + '?',
                        header: 'Borrar reporte',
                        icon: 'pi pi-info-circle',
                        acceptButtonStyleClass: 'p-button-danger p-button-text',
                        rejectButtonStyleClass: 'p-button-text p-button-text',
                        acceptIcon: 'none',
                        rejectIcon: 'none',
                  
                        accept: async () => {
                          const success = await this.store.removeReport(this.report().id ?? 0);
                  
                          if (success) {
                            this.messageSvc.add({
                              severity: 'success',
                              summary: 'Operación realizada',
                              detail: 'Reporte eliminado correctamente!',
                              life: 2000,
                            });
                            this.router.navigate(['/reports']);
                          } else {
                            this.messageSvc.add({
                              severity: 'error',
                              summary: 'Operación realizada',
                              detail: 'Fallo al eliminar el reporte',
                            });
                          }
                        },
                      });
                    }
                }
            ]
        }
    ];
  }

  getCurrentDate(date: number) {
    return new Date(date);
  }
}
