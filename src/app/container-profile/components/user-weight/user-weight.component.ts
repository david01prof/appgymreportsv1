import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '@app/services';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-user-weight',
  standalone: true,
  imports: [ButtonModule,InputNumberModule,ReactiveFormsModule],
  templateUrl: './user-weight.component.html',
  styleUrl: './user-weight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserWeightComponent {

  public readonly _globalSvc = inject(GlobalService);
  public form !: FormGroup<any>;

  private readonly _formBuilder = inject(FormBuilder);

  getDate(date: string) {
    return new Date(date);
  }

  constructor() {
    effect(() => {
      if(this._globalSvc.userInfo().createdAt != ''){
        this.form = this._formBuilder.group({
          objetiveWeight: new FormControl({value: this._globalSvc.userInfo().objetiveWeight, disabled: true}, Validators.required),
          actualWeight: new FormControl({value: this._globalSvc.userInfo().objetiveWeight, disabled: true}, Validators.required),
      });
      }
    }, { allowSignalWrites: true });
  }

  editUserWeight(){
    if(this.form.controls['objetiveWeight'].enabled){
      this.form.controls['objetiveWeight'].disable();
      this.form.controls['actualWeight'].disable();
    }else{

      this.form.controls['objetiveWeight'].enable();
      this.form.controls['actualWeight'].enable();
    }
  }

  onSubmit(){}
}
