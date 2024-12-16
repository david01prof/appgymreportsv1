import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IReport } from '@app/models';
import { GlobalReportStore } from '@app/store/globalReport.store';
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
  
  public report = input.required<IReport>();

  private readonly store = inject(GlobalReportStore);

  removeCharacter(id: number) {
    this.store.removeReport(id);
  }

  getCurrentDate(date: number) {
    return new Date(date);
  }
}
