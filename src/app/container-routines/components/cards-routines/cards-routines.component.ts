import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutinePrimeModule } from '@app/container-routines/routine-prime.module';
import { IRoutine } from '@app/models/iroutine';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cards-routines',
  standalone: true,
  imports: [CommonModule,RoutinePrimeModule],
  templateUrl: './cards-routines-component.component.html',
  styleUrl: './cards-routines-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class CardsRoutinesComponent {
  public routine = input.required<IRoutine>();
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
              this.router.navigate([
                '/routines',
                { outlets: { content: [this.routine().id] } },
              ]);
            },
          },
          {
            label: 'Eliminar',
            icon: 'pi pi-trash',
            command: () => {
              this._confirmationSvc.confirm({
                message:
                  'Quieres borrar la rutina: ' +
                  (this.routine().titleRoutine) +
                  '?',
                header: 'Borrar rutina',
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: 'p-button-danger p-button-text',
                rejectButtonStyleClass: 'p-button-text p-button-text',
                acceptIcon: 'none',
                rejectIcon: 'none',

                accept: async () => {
                  const success = await this.store.removeReport(
                    this.routine().id ?? 0
                  );

                  if (success) {
                    this.messageSvc.add({
                      severity: 'success',
                      summary: 'Operación realizada',
                      detail: 'Rutina eliminada correctamente!',
                      life: 2000,
                    });
                    this.router.navigate(['/routines']);
                  } else {
                    this.messageSvc.add({
                      severity: 'error',
                      summary: 'Operación realizada',
                      detail: 'Fallo al eliminar la rutina',
                    });
                  }
                },
              });
            },
          },
        ],
      },
    ];
  }

  getCurrentDate(date: number) {
    return new Date(date);
  }
}
