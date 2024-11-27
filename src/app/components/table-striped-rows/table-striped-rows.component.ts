import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
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

const PRIME_MODULES = [ ButtonModule, TableModule ,TagModule,IconFieldModule,InputIconModule,InputTextModule]
@Component({
  selector: 'app-table-striped-rows',
  standalone: true,
  imports: [CommonModule,PRIME_MODULES],
  templateUrl: './table-striped-rows.component.html',
  styleUrl: './table-striped-rows.component.scss'
})
export class TableStripedRowsComponent {
  
  products!: any[];

  public columns = input.required<any[]>();
  public isRegister = input.required<boolean>();

  public dataRoutine: IRoutine[] = [];
  public dataRegister: IRegister[] = [];
  loading: boolean = true;


  private readonly _destroyRef = inject(DestroyRef);
  public readonly _routineSvc = inject(RoutinesService);
  private readonly _registerSvc = inject(RegistersService);

  ngOnInit() {  
  }

  ngOnChanges(){
    if(this.isRegister() != undefined && this.isRegister()){
      this.getAllRegisters();
      this.loading = false;
    }else {
      this.getAllRoutines();
      this.loading =  false;
    }
  }

  public getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.products = [...routines]))
      )
      .subscribe();
  }

  public  getAllRegisters() {
    this._registerSvc
      .getAllRegisters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((registers: IRegister[]) => this.products = [...registers])
      )
      .subscribe();
  }

  public getDate(timestamp: any) {
    return new Date(timestamp);
  }

  public getKey() {
    if(this.isRegister()){
      return 'id';
    }else{
      return 'titleRoutine';
    }
  }

  clear(table: Table) {
    table.clear();
}
}
