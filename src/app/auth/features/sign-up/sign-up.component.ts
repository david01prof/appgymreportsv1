import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { Gender, IGenderSelect } from '@app/models';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonModule,ReactiveFormsModule,InputTextModule,InputNumberModule,DropdownModule,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  public genders: IGenderSelect[] | undefined;
  public selectedGende: Gender = Gender.FEMALE;

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authSvc = inject(AuthService);
  private readonly _route = inject(Router);

  forms = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
    age: [0],
    gender: [{ name: 'Femenino', code: Gender.FEMALE }],
    objetiveWeight: [0],
    actualWeight: [0],
    photo: ['']
  });

  ngOnInit(): void {
    this.genders =  [
      { name: 'Femenino', code: Gender.FEMALE },
      { name: 'Masculino', code: Gender.MALE },
      { name: 'No identificado', code: Gender.UNKNOWN },
    ]
  }

  async onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, username,password,age,gender, objetiveWeight, actualWeight, photo } = this.forms.value;

      if (email != undefined && password != undefined && username != undefined && age != undefined && gender != undefined && objetiveWeight != undefined && actualWeight != undefined && photo != undefined)  {
        const userCredential = await this._authSvc.signUp({ email, password });
        const userUid = userCredential.user.uid;
        console.log(actualWeight);
        
        this._authSvc.saveUser({ email, username,password,age,gender, objetiveWeight, actualWeight, photo},userUid);
  
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
