import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { SpeedDialComponent } from "../../components/speed-dial/speed-dial.component";
import { StepsRegistersComponent } from './steps-registers/steps-registers.component';
import { IRegister } from './interfaces/iregister';
import { RegistersService } from './services/registers.service';
import { TableComponent } from './table/table.component';

const PRIME_MODULES = [InputNumberModule,ButtonModule,ToastModule,CardModule,TableComponent,DialogModule];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [PRIME_MODULES, ReactiveFormsModule, CommonModule, StepsRegistersComponent, SpeedDialComponent,BreadcrumbComponent],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  providers: [MessageService],
})
export default class RegistersComponent {

  public forms!: FormGroup;

  public data: IRegister[] = [];
  public itemsLabels : MenuItem[] = [];

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _registerSvc = inject(RegistersService);


  constructor() {
  }

  ngOnInit(): void {
    this.getAllRegisters();
    this.itemsLabels =  this._registerSvc.getBreadcrumbLabels();
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
