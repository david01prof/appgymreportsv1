import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, output, Signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/data-access/auth.service';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import { CalculatorService } from '@app/container-reports/services/calculator.service';
import { emptyReport, Gender, IMeasurement, MeasurementForm } from '@app/models';
import { GlobalService } from '@app/services';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-calculator-pgc',
  standalone: true,
  imports: [CustomInputComponent,ReactiveFormsModule,ButtonModule,DividerModule,CommonModule],
  templateUrl: './calculator-pgc.component.html',
  styles: `
    .character-add-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorPgcComponent {

  public readonly store = inject(GlobalReportStore);
  public readonly _globalSvc = inject(GlobalService);
  
  public dataMeasurement = output<IMeasurement>();
  public disabledNextPage = output<boolean>();
  public measurementEmptyForm = computed(() => emptyReport.measurement);
  public active : number = 0;
  public gender : Gender = Gender.FEMALE;

  private readonly _calculatorSvc = inject(CalculatorService);
  private readonly _authSvc = inject(AuthService);
  private readonly _auth = inject(Auth);

  public measurementForm: Signal<FormGroup<MeasurementForm>> = computed(
    () => 
      new FormGroup<MeasurementForm>({
        height: new FormControl(this.measurementEmptyForm().height, [Validators.min(50)]),
        weight: new FormControl(this.measurementEmptyForm().weight, [Validators.min(30)]),
        waist: new FormControl(this.measurementEmptyForm().waist, [Validators.min(50)]),
        hip: new FormControl(this.measurementEmptyForm().hip, [Validators.min(50)]),
        age: new FormControl(this.measurementEmptyForm().age, {nonNullable: true}),
        neck: new FormControl(this.measurementEmptyForm().neck, [Validators.min(20)]),
        genre: new FormControl(this.measurementEmptyForm().genre,  {nonNullable: true}),
        totaligc: new FormControl(this.measurementEmptyForm().totaligc, {nonNullable: true} ),
      }),
  )
  constructor(){
    effect(() => {
      if(this._globalSvc.userInfo().gender.code == Gender.MALE){
        if(this.measurementForm().value.hip == 0){ this.measurementForm().controls.hip.setValue(50)}
      }
    });
  }
    
  public async onSubmit() {
    if (this.measurementForm().valid) {
      const form = this.measurementForm().value as IMeasurement;

      let userInfo =  await this._authSvc.getUserById(this._auth.currentUser!.uid);   
      userInfo.actualWeight = form.weight;

      this._authSvc.updateUser(this._auth.currentUser!.uid,userInfo)
      
      
      form.height = form.height;
      form.age = this._globalSvc.userInfo().age;
      form.totaligc = this._calculatorSvc.calculateMeasurement(form).toString();
      form.genre = this._globalSvc.userInfo().gender;
      form.age = this._globalSvc.userInfo().age;
      this.dataMeasurement.emit(form);
    }
  }
}
