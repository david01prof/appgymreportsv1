import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    InputNumberModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    InputNumberModule,
    DropdownModule
  ],
})
export class AuthPrimeModule {}
