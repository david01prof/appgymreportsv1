import { FormControl, FormGroup } from "@angular/forms";
import { Gender, IGenderSelect } from "./ireport";

export interface MeasurementForm {
  height: FormControl<number | null>;
  weight: FormControl<number | null>;
  waist: FormControl<number | null>;
  hip: FormControl<number | null>;
  neck: FormControl<number | null>;
  totaligc: FormControl<string>;
  age: FormControl<number>;
  genre: FormControl<IGenderSelect>;
}

export interface ReportForm {
  measurement: FormGroup<MeasurementForm>;
  photos: FormGroup<PhotosForm>;
}

export interface PhotosForm {
  base64: FormControl<string>;
}
