import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    MenuModule,
    TagModule
  ],
  exports: [
    CommonModule,
    CardModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    MenuModule,
    TagModule
  ]
})
export class RoutinesPrimeModule { }
