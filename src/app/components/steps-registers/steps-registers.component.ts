import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { StepsModule } from 'primeng/steps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-registers',
  standalone: true,
  imports: [StepsModule, ToastModule],
  templateUrl: './steps-registers.component.html',
  styleUrl: './steps-registers.component.scss',
  providers: [MessageService],
})
export class StepsRegistersComponent implements OnInit{
  items: MenuItem[];
  activeIndex: number = 0;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Calculadora',
        command: () => this.navigateToStep('registers', 'calculator'),
      },
      {
        label: 'Fotos',
        command: () => this.navigateToStep('registers', 'photos'),
      },
      {
        label: 'Resumen',
        command: () => this.navigateToStep('registers', 'resumen'),
      },
    ];

  }

  ngOnInit(): void {
    this.navigateToStep('registers', 'calculator');
  }



  navigateToStep(step: string, child: string) {
    this.router.navigate([`/${step}`, { outlets: { steps: [child] } }]);
  }

  onStepChange(event: any) {
    this.activeIndex = event.index;
    const step = `step${this.activeIndex + 1}`;
    const child = `child${this.activeIndex + 1}`;
    this.navigateToStep(step, child);
  }
}
