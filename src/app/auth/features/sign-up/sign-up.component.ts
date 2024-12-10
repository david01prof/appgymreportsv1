import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface FormSignUp {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonModule,ReactiveFormsModule,InputTextModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authSvc = inject(AuthService);
  private readonly _route = inject(Router);

  forms = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, password } = this.forms.value;

      if (!email || !password) return;
  
      await this._authSvc.signUp({ email, password });
      this._route.navigateByUrl('/auth/sign-in')
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
