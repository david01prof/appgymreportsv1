import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IRoutine } from '../iroutine';
import { RoutinesService } from '../routines.service';


const PRIME_MODULES = [
  ButtonModule,
  TagModule,
  CardModule,
  TableModule,
  TagModule,
];
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {

  public data = input.required<IRoutine[]>();
  public routines: IRoutine[] = [];

  private _routineSvc = inject(RoutinesService);

  ngOnChanges(): void {
    this.routines = this.data();
  }

  deleteRoutine(id: string) {
    this._routineSvc.deleteRoutine(id);
  }
}
