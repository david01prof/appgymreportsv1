import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate([`/registers`, { outlets: { steps: ['resumen'] } }]);
  }
}
