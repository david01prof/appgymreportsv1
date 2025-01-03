import { inject, InjectionToken } from '@angular/core';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { RoutinesService } from '@app/container-routines/components/cards-routines/services/routines.service';
import { IReport, IRoutine } from '@app/models';
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
  routines: IRoutine[];
};

const initialState: StoreStateReport = {
  routines: [],
};

const STORE_STATE = new InjectionToken<StoreStateReport>('GlobalRoutinesStore', {
  factory: () => initialState,
});

export const GlobalRoutinesStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withEntities<IReport>(),
  withMethods((store, _routinesSvc = inject(RoutinesService)) => ({
    getRoutine(id: number) {
      return store.routines().find((rep) => rep.id === id);
    },

    async addRoutine(routine: Omit<IRoutine, 'id' | 'created'>) {
      try {
        console.log(routine);
        
        await lastValueFrom(_routinesSvc.newRoutine(routine));

        patchState(store, ({ routines }) => ({        
          routines: [...routines, { id: routines[0].id, created: new Date().getTime(), ...routine }],
        }));
      } catch (error) {}
    },

    async removeRoutine(id: number) {
      try {
        await lastValueFrom(_routinesSvc.deleteRoutine(id));

        patchState(store, ({ routines }) => ({
          routines: routines.filter((rep) => rep.id !== id),
        }));
      } catch (error) {}
    },
  })),
  withHooks({
    async onInit(store, _routinesSvc = inject(RoutinesService)) {

      try {
        _routinesSvc.getAllRoutines().subscribe((routines : IRoutine[]) => {
          patchState(store, { routines });
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Manejo de errores
      }
    },
  })
);