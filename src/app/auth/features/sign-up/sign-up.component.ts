import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { Gender } from '@app/models';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
    age: [0],
    gender: [Gender.FEMALE],
    objetiveWeight: [0],
    photo: ['']
  });

  async onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, username,password,age,gender, objetiveWeight, photo } = this.forms.value;

      if (email != undefined && password != undefined && username != undefined && age != undefined && gender != undefined && objetiveWeight != undefined && photo != undefined)  {
        const userCredential = await this._authSvc.signUp({ email, password });
        const userUid = userCredential.user.uid;
  
        this._authSvc.saveUser({ email, username,password,age,gender, objetiveWeight, photo},userUid);
  
        this._route.navigateByUrl('/auth/sign-in')
      }
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
