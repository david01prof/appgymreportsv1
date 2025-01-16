import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IUser } from '@app/models';

@Component({
  selector: 'app-data-user',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './data-user.component.html',
  styleUrl: './data-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataUserComponent{

  user = input.required<IUser>();
  
  getDate(date: string) {
    return new Date(date);
  }
}
