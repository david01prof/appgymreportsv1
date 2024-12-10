import { CommonModule } from '@angular/common';
import { Component, inject, input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IRoutine } from '../../container-routines/interfaces/iroutine';
import { IRegister } from '../../features/registers/interfaces/iregister';
import { RoutinesService } from '@app/container-routines/components/cards-routines/services/routines.service';


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
