import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '@app/services';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    SidebarModule,
    AccordionModule],
  template: `
    <p-sidebar [(visible)]="sidebarVisible4" position="bottom">

      <!-- Home -->
      <div class="flex justify-content-start align-items-center pl-3">
        <div class="circle shadow-4 backgroundHome flex justify-content-center align-items-center mr-3">
          <a class="fa-solid fa-house alignHouse"></a>
        </div>  
        <h3 class="font-lighter text-xl"  routerLink="/">Home</h3>
      </div>

      <p-accordion class="w-full">
        <!-- Routines -->
        <p-accordionTab>
            <ng-template pTemplate="header">
              <div class="flex justify-content-start align-items-center">
                <div class="circle backgroundRoutines flex justify-content-center align-items-center mr-3">
                  <a class="fa-solid fa-dumbbell"></a>
                </div>  
                <h3 class="font-lighter text-xl"  routerLink="/routines">Rutinas</h3>
              </div>
            </ng-template>
            <p class="m-0 pl-7 cursor-pointer" [routerLink]="['/routines',{  outlets: { content: ['add'] }} ]">  <a class="pi pi-plus mr-1 text-sm"></a> Nueva rutina </p>
        </p-accordionTab> 
      </p-accordion>

      <!-- Reports -->
      <p-accordion class="w-full">
        <p-accordionTab>
            <ng-template pTemplate="header">
              <div class="flex justify-content-start align-items-center">
                <div class="circle backgroundReports flex justify-content-center align-items-center mr-3">
                  <a class="fa-solid fa-heart-pulse"></a>
                </div>  
                <h3 class="font-lighter text-xl"  routerLink="/reports">Reportes</h3>
              </div>
            </ng-template>
            <p class="m-0 pl-7 cursor-pointer" [routerLink]="['/reports',{  outlets: { content: ['add'] }} ]">  <a class="pi pi-plus mr-1 text-sm"></a> Nuevo reporte </p>
        </p-accordionTab>
      </p-accordion>

      <!-- Ajustes -->
      <div class="flex justify-content-start align-items-center pl-3">
        <div class="circle backgroundProfile flex justify-content-center align-items-center mr-3">
          <a class="pi pi-cog alignProfile"></a>
        </div>  
        <h3 class="font-lighter text-xl"  routerLink="/profile">Ajustes</h3>
      </div>


      <!-- legal terms -->
      <div class="flex justify-content-start align-items-center pl-3">
        <div class="circle backgroundTerms flex justify-content-center align-items-center mr-3">
          <a class="fa-solid fa-file-pen alignTerms"></a>
        </div>  
        <h3 class="font-lighter text-xl"  routerLink="/politic-terms">Política de privacidad y cookies</h3>
      </div>

      <!-- Logout -->
      <div class="flex justify-content-start align-items-center pl-3">
        <div class="circle backgroundLogout flex justify-content-center align-items-center mr-3">
          <a class="pi pi-sign-out"></a>
        </div>  
        <h3 class="font-lighter text-xl" (click)=" _authStateSvc.logout()">Cerrar sesión</h3>
      </div>

      <!-- Social media -->
      <div class="flex justify-content-center gap-4 mt-3">
      <div class="circle backgroundIntagram flex justify-content-center align-items-center mr-3">
          <a class="pi pi-instagram"></a>
        </div>  
        
        <div class="flex flex-column text-center">
        <span class="font-bold text-lg">MiFitTracker</span>
        <small class="text-sm">Beta</small>
        </div>
        <div class="circle backgroundLinkedin flex justify-content-center align-items-center mr-3">
          <a class="pi pi-linkedin"></a>
        </div>  
      </div>
    </p-sidebar>

    <!-- Button Menu -->
    <div class="flex align-items-center gap-2">
      <div class="card flex justify-content-center menuCss">
        <p-button [link]="true" [text]="true" [raised]="true" [rounded]="true" severity="secondary" (onClick)="sidebarVisible4 = true" icon="pi pi-list"/>
      </div>
  </div>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public sidebarVisible4 = false;

  public readonly _authStateSvc = inject(AuthStateService);
}
