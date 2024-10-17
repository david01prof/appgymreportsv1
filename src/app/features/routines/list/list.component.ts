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
  first = 0;
  rows = 5;

  private _routineSvc = inject(RoutinesService);

  ngOnChanges(): void {
    this.routines = this.data();
  }

  deleteRoutine(id: string) {
    this._routineSvc.deleteRoutine(id);
  }

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

pageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
}

isLastPage(): boolean {
    return this.routines ? this.first === this.routines.length - this.rows : true;
}

isFirstPage(): boolean {
    return this.routines ? this.first === 0 : true;
}
}
