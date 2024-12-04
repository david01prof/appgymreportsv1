import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner-loader',
  standalone: true,
  imports: [CommonModule,ProgressSpinnerModule],
  template: `
    <div class="card flex justify-content-center absolute bottom-50 left-50">
      <p-progressSpinner ariaLabel="loading" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerLoaderComponent {}
