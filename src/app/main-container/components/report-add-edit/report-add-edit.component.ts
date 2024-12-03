import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import { emptyReport, IMeasurement, IPhotos, IReport } from '@app/models';
import { GlobalStore } from '@app/store/global.store';


interface MeasurementForm {
  genre: FormControl<string>;
  height: FormControl<number>;
  weight: FormControl<number>;
  age: FormControl<number>;
  waist: FormControl<number>;
  hip: FormControl<number>;
  totaligc: FormControl<string>;
}

interface ReportForm {
  measurement: FormGroup<MeasurementForm>;
  photos: FormGroup<PhotosForm>;
}

interface PhotosForm {
  base64: FormControl<string>;
}

@Component({
  selector: 'app-report-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CustomInputComponent],
  templateUrl: './report-add-edit.component.html',
  styleUrl: './report-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportAddEditComponent {
  id = input<number>();

  readonly store = inject(GlobalStore);

  reportToEdit = computed(
    () => emptyReport,
  );

  reportForm: Signal<FormGroup<ReportForm>> = computed(() => 
    new FormGroup<ReportForm>({
      measurement: new FormGroup<MeasurementForm>({
        genre: new FormControl(this.reportToEdit().measurement.genre, { nonNullable: true }),
        height: new FormControl(this.reportToEdit().measurement.height, { nonNullable: true }),
        weight: new FormControl(this.reportToEdit().measurement.weight, { nonNullable: true }),
        age: new FormControl(this.reportToEdit().measurement.age, { nonNullable: true }),
        waist: new FormControl(this.reportToEdit().measurement.waist, { nonNullable: true }),
        hip: new FormControl(this.reportToEdit().measurement.hip, { nonNullable: true }),
        totaligc: new FormControl(this.reportToEdit().measurement.totaligc, { nonNullable: true }),
      }),
      photos: new FormGroup<PhotosForm>({
        base64: new FormControl(this.getPhotos(), { nonNullable: true }),
      }),
    })
  );

  onSubmit(): void {
    if (this.reportForm().valid) {

      const measurement = this.reportForm().value.measurement as IMeasurement;
      const photos = this.reportForm().value.photos as IPhotos[];
      
      const report = {
        // ...(this.id() ? { id: Number(this.id()) } : {}),
        id: 0,
        measurement: measurement,
        photos: photos
      };

      const methodToUse = 'addReport';
      console.log(report);
      
      this.store[methodToUse](report);

      this.reportForm().reset();
    }
  }

  private getPhotos() {
    if(this.reportToEdit().photos.length > 0){
      return this.reportToEdit().photos[0].base64
    }
    return ''
  }

  show(control:any){
    console.log(control)
  }
}
