import { Component, HostListener, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  @HostListener('window:click', ['$event'])
  createRipple(event: MouseEvent): void {
    // Crear el span para el efecto ripple
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ripple');

    // Calcular la posición del clic considerando el desplazamiento de la página
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;

    // Añadir ripple al body
    this.renderer.appendChild(document.body, ripple);

    // Posicionar el ripple en la ubicación del clic
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);

    // Eliminar el ripple después de la animación
    setTimeout(() => {
      this.renderer.removeChild(document.body, ripple);
    }, 800); // Duración igual a la animación CSS
  }
}
