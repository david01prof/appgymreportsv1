import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardsRegisterComponent } from './cards-register/cards-register.component';
import { IRegister } from './interfaces/iregister';
import { RegistersService } from './services/registers.service';
import { CalendarModule } from 'primeng/calendar';

const PRIME_MODULES = [ToastModule, CalendarModule, ButtonModule];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    PRIME_MODULES,
    CommonModule,
    BreadcrumbComponent,
    CardsRegisterComponent,
    FormsModule,
  ],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  providers: [MessageService],
})
export default class RegistersComponent {
  public forms!: FormGroup;

  public data: IRegister[] = [];
  public itemsLabels: MenuItem[] = [];
  public date: Date[] = [];

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _registerSvc = inject(RegistersService);

  constructor() {}

  ngOnInit(): void {
    this.getAllRegisters();
    this.itemsLabels = this._registerSvc.getBreadcrumbLabels();

    document.documentElement.style.setProperty(
      '--alignFilterCalendar',
      '-40px'
    );
  }

  getAllRegisters() {
    this._registerSvc
      .getAllRegisters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((registers: IRegister[]) => this.saveData([...registers]))
      )
      .subscribe();
  }

  getValueFilter() {
    if (this.date.length > 0) {
      document.documentElement.style.setProperty(
        '--alignFilterCalendar',
        '-20px'
      );
    }

    this.data = this._registerSvc.getSafeData();
    if (this.date && this.date[1] != null) {
      let timestampA = `${this.date[0].getTime()}`;
      let timestampB = `${this.date[1].getTime()}`;

      this.data = this.data.filter(
        (item: IRegister) =>
          item.created! >= parseInt(timestampA) &&
          item.created! <= parseInt(timestampB)
      );
    }
  }

  clearFilter() {
    this.date = [];
    this.data = this._registerSvc.getSafeData();
    document.documentElement.style.setProperty(
      '--alignFilterCalendar',
      '-40px'
    );
  }

  private saveData(registers: IRegister[]) {
    this.data = [...registers];
    this._registerSvc.safeRegisters(this.data);
  }
}
