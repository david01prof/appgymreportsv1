import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    MenuModule,
    ConfirmDialogModule,
    DividerModule,
    ImageModule,
    StepperModule,
    RadioButtonModule,
    FileUploadModule,
    BadgeModule,
    InputTextareaModule,
    FloatLabelModule
  ],
  exports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    MenuModule,
    ConfirmDialogModule,
    DividerModule,
    ImageModule,
    StepperModule,
    RadioButtonModule,
    FileUploadModule,
    BadgeModule,
    InputTextareaModule,
    FloatLabelModule
  ]
})
export class ReportsPrimeModule { }
