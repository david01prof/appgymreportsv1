import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '@app/services/global.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule,InputNumberModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent {

  control = input.required<FormControl>();
  label = input.required<string>();
  type = input.required<string>();
  id = input.required<string>();
  descriptionLabel = input<string>('');
  placeHolder = input<string>();
  errorMessage = input<string>();

  public _globalService = inject(GlobalService);
}
