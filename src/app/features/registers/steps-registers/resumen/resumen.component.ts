import { Component, inject, input } from '@angular/core';
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

  ngOnChanges(): void {
    console.log(this.register());
    
  }
}
