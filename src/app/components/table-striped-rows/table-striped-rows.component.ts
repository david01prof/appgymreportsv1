import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table, TableModule } from 'primeng/table';
import { tap } from 'rxjs';
import { IRoutine } from '../../features/routines/interfaces/iroutine';
import { RoutinesService } from '../../features/routines/services/routines.service';
import { RegistersService } from '../../features/registers/services/registers.service';
import { IRegister } from '../../features/registers/interfaces/iregister';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

const PRIME_MODULES = [
  ButtonModule,
  TableModule,
  TagModule,
  IconFieldModule,
  InputIconModule,
  InputTextModule,
];
@Component({
  selector: 'app-table-striped-rows',
  standalone: true,
  imports: [CommonModule, PRIME_MODULES,FormsModule],
  templateUrl: './table-striped-rows.component.html',
  styleUrl: './table-striped-rows.component.scss',
})
export class TableStripedRowsComponent {

  @ViewChild('dt2') dt2!: Table;
  
  public products = input.required<any[]>();
  public columns = input.required<any[]>();
  public isRegister = input.required<boolean>();

  public dataRoutine: IRoutine[] = [];
  public dataRegister: IRegister[] = [];
  loading: boolean = true;
  searchValue: string | undefined;

  public readonly _routineSvc = inject(RoutinesService);

  public getDate(timestamp: any) {
    return new Date(timestamp);
  }

  public getKey() {
    if (this.isRegister()) {
      return 'id';
    } else {
      return 'titleRoutine';
    }
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;  // Aseguramos que sea un input
    if (inputElement && inputElement.value) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  getFilterFields(){
    if(this.isRegister()){
      return ['id','totaligc','created'];
    }else {
      return ['titleRoutine','tag','exercises','date'];
    }
  }
}
