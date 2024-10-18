import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IRoutine } from '../iroutine';
import { RoutinesService } from '../routines.service';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

const PRIME_MODULES = [
  ButtonModule,
  TagModule,
  CardModule,
  TableModule,
  TagModule,
  InputTextModule,
  PanelModule, AvatarModule,MenuModule
];
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, FormsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [DatePipe],
})
export class ListComponent {
  public data = input.required<IRoutine[]>();
  public routines: IRoutine[] = [];
  public first = 0;
  public rows = 5;
  public loading: boolean = true;
  public searchValue: string | undefined;

  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  private _routineSvc = inject(RoutinesService);

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'Refresh',
          icon: 'pi pi-refresh'
      },
      {
          label: 'Search',
          icon: 'pi pi-search'
      },
      {
          separator: true
      },
      {
          label: 'Delete',
          icon: 'pi pi-times'
      }
  ];
  }

  ngOnChanges(): void {
    this.routines = this.data();
    if (this.data() != undefined && this.data().length > 0) {
      this.loading = false;

      for (let index in this.routines) {
        const date = this.routines[index].date;

        this.routines[index].date = new Date(
          date.seconds * 1000 + date.nanoseconds / 1000000
        );

        this.routines[index].date = this.datePipe.transform(
          this.routines[index].date,
          'dd/MM/yyyy'
        );
      }
    }
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

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.routines
      ? this.first === this.routines.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.routines ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}
