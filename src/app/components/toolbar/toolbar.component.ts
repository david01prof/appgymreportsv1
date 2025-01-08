import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '@app/services';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    RouterLink,
    ButtonModule,
    MenuModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule
  ],
  template: `
    <!-- <p-menubar [model]="items">
      <ng-template pTemplate="item" let-item let-root="root">
        <a
          pRipple
          class="flex align-items-center p-menuitem-link"
          [routerLink]="['/' + item.route]"
        >
          <span [class]="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </ng-template>
      <ng-template pTemplate="end">
        <div class="flex align-items-center gap-2">
          <div class="card flex justify-content-center">
            <p class="styleUsername">{{ _globalSvc.userInfo().username }}</p>
            <p-menu
              #menu
              [model]="itemsProfile"
              [popup]="true"
              class="styleButton"
            />
            <p-button [link]="true" (onClick)="menu.toggle($event)"
              ><p-avatar
                [image]="_globalSvc.userInfo().photo"
                shape="circle"
                class="mr-2"
            /></p-button>
          </div>
        </div>
      </ng-template>
    </p-menubar> -->

    <div class="flex align-items-center gap-2">
          <p-menu
              #menu
              [model]="itemsProfile"
              [popup]="true"
              class="styleButton"
            />
          <div class="card flex justify-content-center menuCss">
            <!-- <p class="styleUsername">{{ _globalSvc.userInfo().username }}</p> -->

            <p-button [link]="true" (onClick)="menu.toggle($event)" [text]="true" [raised]="true" [rounded]="true" severity="secondary">
              <i class="pi pi-list"></i>
            </p-button>
          </div>
        </div>

    <div class="card">
      <p-toolbar class="custom-toolbar">
        <div class="p-toolbar-group-center flex justify-content-around w-full">
            <div class="flex flex-column toolbarButton">
              <p-button icon="pi pi-book" severity="primary" routerLink="/reports"/>
              <span class="font-light text-gray-400 mt-1 text-sm">Reportes</span>
            </div>
            <div class="flex flex-column toolbarButton">
              <p-button icon="pi pi-home" severity="primary" routerLink="/"/>
              <span class="font-light text-gray-400 mt-1 text-sm">Home</span>
            </div>
            <div class="flex flex-column toolbarButton">
              <p-button icon="pi pi-list" severity="primary" routerLink="/routines"/>
              <span class="font-light text-gray-400 mt-1 text-sm">Rutinas</span>
            </div>
        </div>
      </p-toolbar>
    </div>
  `,
  styles: `
    ::ng-deep .p-button.p-button-link  {
      height: 35px;
    }
    .styleUsername{
      margin: 10px 0;
    }

    .toolbarButton{
      margin-top: -30px;
    }

    ::ng-deep .p-toolbar{
      border: none;
    }

    .custom-toolbar {
      position: fixed;    /* Fija la barra en la ventana */
      bottom: 0;          /* Posición en la parte inferior */
      left: 0;            /* Alinea a la izquierda */
      width: 100%;        /* Abarca todo el ancho de la ventana */
      z-index: 1000;      /* Asegura que esté sobre otros elementos */
      background-color: white; /* Color de fondo para que sea visible */
    }

    .menuCss{
      position: fixed;
        right: 1rem;
        top: 1.5rem;
        z-index: 1000;
    }
    
  `,
})
export class ToolbarComponent {
  public items: MenuItem[] | undefined;
  public items2: MenuItem[] | undefined;
  public itemsProfile: MenuItem[] | undefined;

  private readonly _authStateSvc = inject(AuthStateService);
  public readonly _globalSvc = inject(GlobalService);

  async ngOnInit() {
    this.items2 = [
      {
          label: 'Update',
          icon: 'pi pi-refresh'
      },
      {
          label: 'Delete',
          icon: 'pi pi-times'
      }
  ];
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: 'dashboard',
      },
      {
        label: 'Reportes',
        icon: 'pi pi-star',
        route: 'reports',
      },
      {
        label: 'Rutinas',
        icon: 'pi pi-search',
        route: 'routines',
      },
    ];

    this.itemsProfile = [
      {
        label: 'Perfil',
        icon: 'pi pi-cog',
        routerLink: ['/profile'],
      },
      {
        label: 'Terminos y condiciones',
        icon: 'pi pi-cog',
        routerLink: ['/politic-terms'],
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
          this._authStateSvc.logout();
        },
      },
    ];
  }
}
