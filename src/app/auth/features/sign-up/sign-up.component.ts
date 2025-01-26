import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthPrimeModule } from '@app/auth/auth-prime.module';
import { AuthService } from '@app/auth/data-access/auth.service';
import { emptyUser, Gender, IGenderSelect, IUser } from '@app/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink,AuthPrimeModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  public genders: IGenderSelect[] = [
    { name: 'Femenino', code: Gender.FEMALE },
    { name: 'Masculino', code: Gender.MALE },
  ];
  public selectedGende: Gender = Gender.FEMALE;
  public isValidUsername = true;
  public isPasswordMatch = true;

  private readonly _formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly _authSvc = inject(AuthService);
  private readonly _route = inject(Router);

  forms = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(1)]],
    age: [0, [Validators.required]],
    gender: [{ name: 'Femenino', code: Gender.FEMALE }],
    objetiveWeight: [0],
    actualWeight: [0],
    photo: [emptyUser.photo]
  });

  checkIfExists(){
    const username = this.forms.value.username;
    if(username != undefined ){
      this._authSvc.getAllUsers().subscribe((users: IUser[]) => {
        for(let user of users){
          if(user.username == username){
            this.isValidUsername = false;
            break;
          }else{
            this.isValidUsername = true;
          }
        }
      })
    }
  }

  checkIfMatch(){
    if(this.forms.value.password != this.forms.value.confirmPassword){
      return this.isPasswordMatch =false;
    }else{
      return this.isPasswordMatch = true;
    }
  }

  async onSubmit() {
    if (this.forms.invalid) return;

    try{
      const { email, username,password,age,gender, objetiveWeight, actualWeight, photo } = this.forms.value;

      if (email != undefined && password != undefined && username != undefined && age != undefined && gender != undefined && objetiveWeight != undefined && actualWeight != undefined && photo != undefined)  {
        this._authSvc.signUp({ email, password }).subscribe({
          next: (userCredential) => {
            const userUid = userCredential.user.uid;
            this._authSvc.saveUser({ email, username,password,age,gender, objetiveWeight, actualWeight, photo},userUid);
            this._route.navigateByUrl('/dashboard');
          },
          error:() => {
            this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al crear el usuario: ' + username });
          },
          })
      }
    }
    catch(error){
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Error al realizar la operación' });
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
