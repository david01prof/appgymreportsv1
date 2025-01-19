import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { GlobalService } from '@app/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule,ToastModule],
  template: `
    <div class="flex justify-content-center align-items-center surface-ground min-h-screen">
      <div class="p-4 surface-card shadow-2 border-round w-full sm:w-10 md:w-6 lg:w-6">

        <form [formGroup]="emailForm">
          <div class="card flex justify-content-center">
            <div class="flex flex-column gap-2 mb-2">
              <label for="email">Email</label>
              <input
                pInputText
                id="email"
                aria-describedby="username-help"
                formControlName="email"
              />
              <small id="username-help">
                Introduce tu email para reestablecer tu contraseña
              </small>
            </div>
          </div>

          <div class="flex justify-content-center gap-2 mt-3">
          <p-button (onClick)="route.navigateByUrl('/auth/sign-in')" severity="secondary">Iniciar sesión</p-button>
          <p-button (onClick)="reset()" [disabled]="!emailForm.valid">Reestablecer contraseña</p-button>
          </div>

        </form>

      </div>
    </div>

    <p-toast/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent {

  public emailForm: FormGroup;
  public  readonly route = inject(Router);

  private readonly _authSvc = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly _globalSvc = inject(GlobalService);

  constructor() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async reset(){
    const success = await this._authSvc.resetPassword(this._globalSvc.userInfo().email);
    success.subscribe((res) => {
      if(res != undefined && res.success){
        this.messageService.add({ severity: 'success', summary: 'Operación realizada', detail: 'Correo de restablecimiento enviado correctamente!' });
        setInterval(() => {this.route.navigateByUrl('/auth/sign-in');}, 4000);
        
      }else{
        this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al enviar correo de restablecimiento' });
        setInterval(() => {this.route.navigateByUrl('/auth/sign-in');}, 4000);
      }
    });
  }
}
