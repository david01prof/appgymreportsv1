import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IRegister } from '../../interfaces/iregister';
import { DialogModule } from 'primeng/dialog';
import { ResumenComponent } from '../../steps-registers/resumen/resumen.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RegistersService } from '../../services/registers.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-detail-cards',
  standalone: true,
  imports: [CommonModule,CardModule,DialogModule,ResumenComponent,ConfirmDialogModule,DividerModule],
  templateUrl: './detail-cards.component.html',
  styleUrl: './detail-cards.component.scss',
  providers: [ConfirmationService],
})
export class DetailCardsComponent {

  public register = input.required<IRegister>();
  public id = input.required<number>();

  public visible = false;
  
  private readonly _registerSvc = inject(RegistersService);

  constructor( private confirmationService: ConfirmationService) {}

  getCurrentDate(date: number) {
    return new Date(date);
  }

  showDialogResumen(){
    this.visible = true;
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Quieres eliminar este reporte?',
      header: 'Confirmacion',
      accept: () => {
        this._registerSvc.deleteRegister(this.register().id!)
        this.visible = false;
       },
      reject: () => {},
    });
  }
}
