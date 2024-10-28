import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent {

  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate([`/registers`]);
}
}
