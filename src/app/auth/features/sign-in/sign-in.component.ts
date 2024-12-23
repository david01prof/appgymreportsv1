import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonModule,RouterLink,ReactiveFormsModule,InputTextModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authSvc = inject(AuthService);
  public  readonly _route = inject(Router);

  forms = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, password } = this.forms.value;

      if (!email || !password) return;
  
      await this._authSvc.signIn({ email, password });
      this._route.navigateByUrl('/dashboard')
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
