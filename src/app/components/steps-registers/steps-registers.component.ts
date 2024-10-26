import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-steps-registers',
  standalone: true,
  imports: [StepsModule,ToastModule],
  templateUrl: './steps-registers.component.html',
  styleUrl: './steps-registers.component.scss',
  providers: [MessageService],
})
export class StepsRegistersComponent {
  items: MenuItem[] = [];

  subscription!: Subscription;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Personal',
        routerLink: 'personal',
      },
      {
        label: 'Seat',
        routerLink: 'seat',
      },
      {
        label: 'Payment',
        routerLink: 'payment',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}
}
