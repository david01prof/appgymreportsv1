import { ChangeDetectionStrategy, Component, computed, inject, output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import { MeasurementForm } from '@app/container-reports/interfaces';
import { emptyReport, IMeasurement } from '@app/models';
import { GlobalStore } from '@app/store/global.store';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-calculator-pgc',
  standalone: true,
  imports: [CustomInputComponent,ReactiveFormsModule,ButtonModule],
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

  public readonly store = inject(GlobalStore);
  
  public dataMeasurement = output<IMeasurement>();
  public disabledNextPage = output<boolean>();
  public measurementEmptyForm = computed(() => emptyReport.measurement);
  public active : number = 0;

  public measurementForm: Signal<FormGroup<MeasurementForm>> = computed(
    () => 
      new FormGroup<MeasurementForm>({
        height: new FormControl(this.measurementEmptyForm().height, { nonNullable: true }),
        weight: new FormControl(this.measurementEmptyForm().weight, { nonNullable: true }),
        waist: new FormControl(this.measurementEmptyForm().waist, { nonNullable: true }),
        hip: new FormControl(this.measurementEmptyForm().hip, { nonNullable: true }),
        totaligc: new FormControl(this.measurementEmptyForm().totaligc, { nonNullable: true }),
      }),
  )

  public onSubmit(): void {
    if (this.measurementForm().valid) {
      this.dataMeasurement.emit(this.measurementForm().value as IMeasurement);
    }
  }
}
