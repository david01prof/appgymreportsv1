import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthPrimeModule } from '@app/auth/auth-prime.module';
import { AuthService } from '@app/auth/data-access/auth.service';
import { IUser } from '@app/models';
import { GlobalService } from '@app/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthPrimeModule],
  template: `
    <form [formGroup]="emailForm">
      <div class="flex justify-content-center align-items-center min-h-screen">
        <p-card>
          <div class="text-center mb-3">
            <img
              src="assets/images/logo3.png"
              alt="logo"
              class="border-round-xl shadow-5 mt-5"
              style="width: 124px;"
            />
            <div class="flex justify-content-center align-items-center mt-3">
              <p class="textColor w-10">
                Bienvenido de nuevo! Por favor inicia sesión en tu cuenta.
              </p>
            </div>
          </div>

          <div class="mt-3">
            <p-floatLabel>
              <input
                pInputText
                id="email"
                type="email"
                formControlName="email"
                class="w-full"
                (blur)="checkIfExists()"
              />
              <label for="email" class="textColor">Email</label>
            </p-floatLabel>
          </div>

          <div class="flex justify-content-center mt-3">
            <p-button
              (onClick)="reset()"
              severity="info"
              [disabled]="!ifExistsEmail"
              >Enviar correo</p-button
            >
          </div>

          <p class="text-center">
            Has recordado tu contraseña?
            <a class="no-underline" routerLink="/auth/sign-in"
              >Iniciar sesión</a
            >
          </p>
        </p-card>
      </div>
    </form>

    <p-toast />
  `,
  styleUrls: ['./forget-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent {
  public emailForm: FormGroup;
  public ifExistsEmail = false;

  public readonly route = inject(Router);

  private readonly _authSvc = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly _globalSvc = inject(GlobalService);

  constructor() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async reset() {
    const success = await this._authSvc.resetPassword(
      this._globalSvc.userInfo().email
    );
    success.subscribe((res) => {
      if (res != undefined && res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación realizada',
          detail: 'Correo de restablecimiento enviado correctamente!',
        });
        setInterval(() => {
          this.route.navigateByUrl('/auth/sign-in');
        }, 4000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación realizada',
          detail: 'Fallo al enviar correo de restablecimiento',
        });
        setInterval(() => {
          this.route.navigateByUrl('/auth/sign-in');
        }, 4000);
      }
    });
  }

  checkIfExists() {
    const email = this.emailForm.value.email;
    if (email != undefined) {
      this._authSvc.getAllUsers().subscribe((users: IUser[]) => {
        for (let user of users) {
          if (user.email == email) {
            this.ifExistsEmail = true;
            break;
          } else {
            this.ifExistsEmail = false;
          }
        }
      });
    }
  }
}
