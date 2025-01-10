import { Component, HostListener, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { Auth } from "@angular/fire/auth";
import { AuthService } from "@app/auth/data-access/auth.service";
import { GlobalService } from "@app/services";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent,CommonModule,ButtonModule],
  template: `
    <app-toolbar></app-toolbar>

    <div class="h-auto">
      <section class="sectionSpace">
        <router-outlet name="content"></router-outlet>
      </section>
    </div>

    <!-- Botón de scroll -->
    <p-button *ngIf="showScrollToTopButton" class="scroll-to-top fadein animation-duration-1000" (click)="scrollToTop()" [rounded]="true" icon="pi pi-chevron-up" severity="info" [raised]="true" />
  `,
  styles: `
    .sectionSpace{
      margin-bottom: 80px;
    }

    /* Estilo del botón */
    .scroll-to-top {
      position: fixed;
      bottom: 75px;
      right: 8px;
      z-index: 1000;
    }
  `
})

export class LayoutComponent {

  private readonly auth = inject(Auth);
  private readonly _authSvc = inject(AuthService);
  private readonly _globalSvc = inject(GlobalService);

  async ngOnInit() {
    let userInfo =  await this._authSvc.getUserById(this.auth.currentUser!.uid);   
    this._globalSvc.userInfo.set(userInfo);
  }

  showScrollToTopButton = false; // Controla la visibilidad del botón

  // Escucha el evento de scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    this.showScrollToTopButton = scrollY > 300; // Mostrar el botón después de 300px
  }

  // Método para volver al principio de la página
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Scroll suave
    });
  }
}