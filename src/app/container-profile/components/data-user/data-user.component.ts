import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalService } from '@app/services';

@Component({
  selector: 'app-data-user',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './data-user.component.html',
  styleUrl: './data-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataUserComponent{

  public readonly _globalSvc = inject(GlobalService);
  
  getDate(date: string) {
    return new Date(date);
  }
}
