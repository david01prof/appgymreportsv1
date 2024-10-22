import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { IRoutine } from '../iroutine';
import { TopMenuListComponent } from './top-menu/top-menu-list.component';

const PRIME_MODULES = [
  ButtonModule,
  TagModule,
  CardModule,
  TableModule,
  TagModule,
  InputTextModule,
  PanelModule,
  AvatarModule,
  MenuModule,
  DialogModule,
  ConfirmDialogModule,
  ToastModule,
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, FormsModule, RouterModule,DialogDetailComponent,TopMenuListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [DatePipe, ConfirmationService, MessageService],
})
export class ListComponent {
  
  public dataRoutines = input.required<IRoutine[]>();
  public first = 0;
  public rows = 5;
  public loading: boolean = true;
  public searchValue: string | undefined;
  public isCardDisabled: boolean = true; // ! A futuro

  constructor( private datePipe: DatePipe ) {}

  ngOnChanges(): void {
    if (this.dataRoutines() != undefined && this.dataRoutines().length > 0) {
      this.loading = false;

      for (let index in this.dataRoutines()) {
        const date = this.dataRoutines()[index].date;

        this.dataRoutines()[index].date = new Date(
          date.seconds * 1000 + date.nanoseconds / 1000000
        );

        this.dataRoutines()[index].date = this.datePipe.transform(
          this.dataRoutines()[index].date,
          'dd/MM/yyyy'
        );
      }
    }
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getFirstOut(first: number){
    this.first = first;
  }
}
