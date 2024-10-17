import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRoutine } from './iroutine';
import { RoutinesService } from './routines.service';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [ListComponent],
  template: `
    <app-list [data]="data"></app-list>
  `,
  styles: ``
})
export class RoutinesComponent implements OnInit {

  private readonly _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);
  
  public data! : IRoutine[];

  ngOnInit(): void {
      this.getAllRoutines();
  }
  
  getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.data = [...routines]))
      )
      .subscribe();
  }
}
