import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { IRegister } from '../interfaces/iregister';
import { RegistersService } from '../registers.service';

const PRIME_MODULES = [ButtonModule, DividerModule, ImageModule];
@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PRIME_MODULES],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss',
})
export class ResumenComponent implements OnInit {
  public register!: IRegister;
  private readonly _registerSvc = inject(RegistersService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.register = this._registerSvc.viewLogWithoutUploading();
  }
}
