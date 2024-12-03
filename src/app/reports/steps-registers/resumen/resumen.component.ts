import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { IRegister } from '../../interfaces/iregister';
import { CommonModule } from '@angular/common';
const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule];
@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss',
})
export class ResumenComponent {
  
  public register = input.required<IRegister>();
  public isDetail = input.required<boolean>();
  
}
