import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonModule,RouterLink,ReactiveFormsModule,InputTextModule,CommonModule,PasswordModule,ToastModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  private readonly messageService = inject(MessageService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authSvc = inject(AuthService);
  public  readonly _route = inject(Router);
  public forgetPassword = false;

  forms = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, password } = this.forms.value;

      if (!email || !password) return;
  
      this._authSvc.signIn({ email, password }).subscribe({
        next: (userCredential) => {
          this._route.navigateByUrl('/dashboard')
        },
        error:(error) => {
          this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al loguearte'});
        }
      });
      
    }
    catch(error){
      console.error(error);
    }
  }

  async submitGoogle() {
    try{
      await this._authSvc.signInWidthGoogle();
      this._route.navigateByUrl('/dashboard');
    }
    catch(error){
      console.error(error);
    }
  }
}
