import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { IRegister } from '../../interfaces/iregister';
import { RegistersService } from '../../services/registers.service';
const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule];
@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PRIME_MODULES],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss',
})
export class ResumenComponent {
  
  public register = input.required<IRegister>();

  private readonly _registerSvc = inject(RegistersService);

  constructor() {}
  ngOnInit(): void {console.log(this.register());}
  ngOnChanges(): void {
    // console.log(this.register());
    
  }
}
