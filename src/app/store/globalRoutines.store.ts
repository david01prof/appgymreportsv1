import { inject, InjectionToken } from '@angular/core';
import { RoutinesService } from '@app/container-routines/services/routines.service';
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
        const response = await lastValueFrom(_routinesSvc.newRoutine(routine));
        if(response){
          patchState(store, ({ routines }) => ({        
            routines: [...routines, { id: routines[0].id, created: new Date().getTime(), ...routine }],
          }));

          return true;
        }else{
          throw new Error('Error al agregar la rutina');
        }
        
      } catch (error) {
        console.error('Error en addRoutine:', error);
        return false;
      }
    },

    async updateRoutine(routine: IRoutine) {
      try {
        const response = await lastValueFrom(_routinesSvc.updateRoutine(routine));

        if(response){
          patchState(store, ({ routines }) => ({
            routines: routines.map((r) => (r.id === routine.id ? { ...r, ...routine } : r)),
          }));

          return true;
        }else{
          throw new Error('Error al actualizar la rutina');
        }
        
      } catch (error) {
        return false;
      }
    },

    async removeRoutine(id: number) {
      try {
        const response = await lastValueFrom(_routinesSvc.deleteRoutine(id));

        if(response){
          patchState(store, ({ routines }) => ({
            routines: routines.filter((rep) => rep.id !== id),
          }));

          return true;
        }else{
          throw new Error('Error al eliminar la rutina');
        }
        
      } catch (error) {
        return false;
      }
    },
  })),

  withHooks({
    async onInit(store, _routinesSvc = inject(RoutinesService)) {

      try {
        _routinesSvc.getAllRoutines().subscribe((routines : IRoutine[]) => {
          console.log(routines);
          
          patchState(store, { routines });
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Manejo de errores
      }
    },
  })
);