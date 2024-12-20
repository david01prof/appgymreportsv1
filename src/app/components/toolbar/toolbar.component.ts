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
  ],
  template: `

        <p-menubar [model]="items">
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
                <p class="styleUsername">{{_globalSvc.userInfo().username}}</p>
                <p-menu #menu [model]="itemsProfile" [popup]="true"  class="styleButton"/>
                <p-button [link]="true" (onClick)="menu.toggle($event)"><p-avatar
                    [image]="_globalSvc.userInfo().photo"
                    shape="circle"
                    class="mr-2"
                  /></p-button>
              </div>
            </div>
          </ng-template>
        </p-menubar>
  `,
  styles: `
    ::ng-deep .p-button.p-button-link  {
      height: 35px;
    }
    .styleUsername{
      margin: 10px 0;
    }
  `,
})
export class ToolbarComponent {
  public items: MenuItem[] | undefined;
  public itemsProfile: MenuItem[] | undefined;

  private readonly _authStateSvc = inject(AuthStateService);
  public readonly _globalSvc = inject(GlobalService);

  async ngOnInit() {
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
        routerLink: ['/profile']
      },
      {
        label: 'Terminos y condiciones',
        icon: 'pi pi-cog',
        routerLink: ['/politic-terms']
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
          this._authStateSvc.logout();
      }
      },
    ];    
  }
}
