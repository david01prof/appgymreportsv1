import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';

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
    FloatLabelModule,
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
    FloatLabelModule,
  ],
})
export class RoutinePrimeModule {}
