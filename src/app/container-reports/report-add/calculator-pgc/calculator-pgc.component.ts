import { ChangeDetectionStrategy, Component, computed, inject, output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import { CalculatorService } from '@app/container-reports/services/calculator.service';
import { emptyReport, IMeasurement, MeasurementForm } from '@app/models';
import { GlobalService } from '@app/services';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-calculator-pgc',
  standalone: true,
  imports: [CustomInputComponent,ReactiveFormsModule,ButtonModule,DividerModule],
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
  private readonly _globalSvc = inject(GlobalService);
  
  public dataMeasurement = output<IMeasurement>();
  public disabledNextPage = output<boolean>();
  public measurementEmptyForm = computed(() => emptyReport.measurement);
  public active : number = 0;

  private readonly _calculatorSvc = inject(CalculatorService);

  public measurementForm: Signal<FormGroup<MeasurementForm>> = computed(
    () => 
      new FormGroup<MeasurementForm>({
        height: new FormControl(this.measurementEmptyForm().height, { nonNullable: true }),
        weight: new FormControl(this.measurementEmptyForm().weight, { nonNullable: true }),
        waist: new FormControl(this.measurementEmptyForm().waist, { nonNullable: true }),
        hip: new FormControl(this.measurementEmptyForm().hip, { nonNullable: true }),
        age: new FormControl(this.measurementEmptyForm().age, { nonNullable: true }),
        genre: new FormControl(this.measurementEmptyForm().genre, { nonNullable: true }),
        totaligc: new FormControl(this.measurementEmptyForm().totaligc, { nonNullable: true }),
      }),
  )

  public onSubmit(): void {
    if (this.measurementForm().valid) {
      const form = this.measurementForm().value as IMeasurement;

      form.height = parseFloat((form.height / 100).toFixed(2));
      form.age = 23;
      form.totaligc = this._calculatorSvc.calculateMeasurement(form);
      form.genre = this._globalSvc.userInfo().gender;
      form.age = this._globalSvc.userInfo().age;
      
      this.dataMeasurement.emit(form);
    }
  }
}
