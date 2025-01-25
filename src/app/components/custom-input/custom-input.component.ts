import { ChangeDetectionStrategy, Component, effect, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '@app/services/global.service';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule,InputNumberModule,TextareaModule,CheckboxModule,DropdownModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  control = input.required<FormControl>();
  label = input<string>();
  type = input.required<string>();
  id = input.required<string>();
  valuesDropdown = input<any[]>();
  keyDropdown = input<string>();
  descriptionLabel = input<string>('');
  placeHolder = input<string>();
  errorMessage = input<string>();
  minValue = input<string>('0');
  maxValue = input<string>('999');
  minLength = input<string>('0');
  maxLength = input<string>('5');

  public _globalService = inject(GlobalService);

  onTouched = () => {};
  onChange = (_value: any) => {};

  constructor() {
    effect(() => {
      const currentSignalValue = this.control().value;

      if(this.control().dirty || this.control().touched){
        const newValue = this.control().value;

        if(newValue != currentSignalValue){
          this.onChange(newValue);
        }
      }
    }, { allowSignalWrites: true });
  }

  writeValue(value: any) :void {
    if(value != this.control().value){
      this.control().setValue(value,{emitEvent: false});
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control().disable() : this.control().enable();
  }
}
