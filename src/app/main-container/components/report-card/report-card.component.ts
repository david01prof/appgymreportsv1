import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IReport } from '@app/models';
import { GlobalStore } from '@app/store/global.store';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule,CardModule,NgOptimizedImage,RouterLink],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportCardComponent {
  report = input.required<IReport>();

  readonly store = inject(GlobalStore);

  

  removeCharacter(id: number) {
    this.store.removeReport(id);
  }

  showDialogResumen(){}

  getCurrentDate(date: number) {
    return new Date(date);
  }
}
