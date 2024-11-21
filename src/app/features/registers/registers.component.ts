import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';
import { SpeedDialComponent } from "../../components/speed-dial/speed-dial.component";
import { StepsRegistersComponent } from '../../components/steps-registers/steps-registers.component';
import { TableComponent } from './table/table.component';
import { IRegister } from './interfaces/iregister';
import { RegistersService } from './registers.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TreeTableComponent } from '../../components/tree-table/tree-table.component';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule,TableComponent,DialogModule];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES, ReactiveFormsModule, CommonModule, StepsRegistersComponent, SpeedDialComponent,BreadcrumbComponent,TreeTableComponent],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  providers: [MessageService],
})
export default class RegistersComponent {

  public forms!: FormGroup;
  public columns : string[] = ['registro', 'fecha','detalle'];

  public totaligc: string | undefined;
  public data: IRegister[] = [];
  public items = [
    { icon: 'pi pi-home', route: '/registers' },
    { label: 'Registros'  }
  ];

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _registerSvc = inject(RegistersService);


  constructor() {
  }

  ngOnInit(): void {
    this.getAllRegisters();
  }

  getAllRegisters() {
    this._registerSvc
      .getAllRegisters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((registers: IRegister[]) => (this.data = [...registers]))
      )
      .subscribe();
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
