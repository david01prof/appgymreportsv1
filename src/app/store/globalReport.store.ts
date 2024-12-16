import { inject, InjectionToken } from '@angular/core';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { IReport } from '@app/models';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { lastValueFrom } from 'rxjs';

type StoreStateReport = {
  reports: IReport[];
};

const initialState: StoreStateReport = {
  reports: [],
};

const STORE_STATE = new InjectionToken<StoreStateReport>('GlobalReportStore', {
  factory: () => initialState,
});

export const GlobalReportStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withEntities<IReport>(),
  withMethods((store, _reportSvc = inject(ReportsService)) => ({
    getReport(id: number) {
      return store.reports().find((rep) => rep.id === id);
    },

    async addReport(report: Omit<IReport, 'id' | 'created'>) {
      try {
        console.log(report);
        
        await lastValueFrom(_reportSvc.addReport(report));

        patchState(store, ({ reports }) => ({        
          reports: [...reports, { id: reports[0].id, created: new Date().getTime(), ...report }],
        }));
      } catch (error) {}
    },

    async removeReport(id: number) {
      try {
        await lastValueFrom(_reportSvc.removeReport(id));

        patchState(store, ({ reports }) => ({
          reports: reports.filter((rep) => rep.id !== id),
        }));
      } catch (error) {}
    },
  })),
  withHooks({
    async onInit(store, _reportSvc = inject(ReportsService)) {

      try {
        _reportSvc.getAllReports().subscribe((reports : IReport[]) => {
          patchState(store, { reports });
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Manejo de errores
      }
    },
  })
);