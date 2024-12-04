import { FormControl, FormGroup } from "@angular/forms";

export interface MeasurementForm {
  height: FormControl<number>;
  weight: FormControl<number>;
  waist: FormControl<number>;
  hip: FormControl<number>;
  totaligc: FormControl<string>;
}

export interface ReportForm {
  measurement: FormGroup<MeasurementForm>;
  photos: FormGroup<PhotosForm>;
}

export interface PhotosForm {
  base64: FormControl<string>;
}
