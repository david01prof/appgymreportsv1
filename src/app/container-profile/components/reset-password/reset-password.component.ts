import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/data-access/auth.service';
import { GlobalService } from '@app/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,PasswordModule,ButtonModule,ToastModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  private readonly _globalSvc = inject(GlobalService);
  private readonly _authSvc = inject(AuthService);
  private readonly messageService = inject(MessageService);

  async reset(){
    const success = await this._authSvc.resetPassword(this._globalSvc.userInfo().email);
    success.subscribe((res) => {
      if(res != undefined && res.success){
        this.messageService.add({ severity: 'success', summary: 'Operación realizada', detail: 'Correo de restablecimiento enviado correctamente!' });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al enviar correo de restablecimiento' });
      }
    });
  }
}
