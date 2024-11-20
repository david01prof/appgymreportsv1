import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardsRoutinesComponent } from './cards-routines/cards-routines.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { IRoutine } from './interfaces/iroutine';
import { RoutinesService } from './services/routines.service';

const PRIME_MODULES = [
  ButtonModule,
  CardModule,
  SidebarModule,
  TagModule,
  InputTextModule,
  DividerModule,
  DialogModule,
  BreadcrumbModule,
];
@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PRIME_MODULES,
    BreadcrumbComponent,
    CardsRoutinesComponent,
    DialogDetailComponent,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
})
export default class RoutinesComponent implements OnInit {
  public data: IRoutine[] = [];
  public chargeComponent: boolean = false;
  public item!: IRoutine;
  public searchControl = new FormControl('');
  public activeForm!: FormGroup;
  public visible: boolean = false;
  public itemsLabels : MenuItem[] = [];


  private readonly _routineSvc = inject(RoutinesService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllRoutines();
    this.itemsLabels = this._routineSvc.getBreadcrumbLabels();
  }

  public getAllRoutines() {
    this._routineSvc
      .getAllRoutines()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((routines: IRoutine[]) => (this.data = [...routines]))
      )
      .subscribe();
  }

  public handleSidebarHide() {
    this.chargeComponent = false;
  }

  public getActiveItem(e: IRoutine) {
    this.chargeComponent = true;
    this.visible = true;
    this.item = e;
  }

  public getValueHideDialog() {
    this.chargeComponent = false;
    this.visible = false;
  }
}
