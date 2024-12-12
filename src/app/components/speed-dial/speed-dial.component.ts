import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  imports: [SpeedDialModule],
  template: `
    <p-speedDial
      [model]="leftTooltipItems"
      className="speeddial-right"
      direction="up"
    />
  `,
  styles: `
    :host ::ng-deep .speeddial-left {
    left: 0;
    bottom: 0;
    }

    :host ::ng-deep .speeddial-right {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }

    :host ::ng-deep .speeddial-right button{
        height: 40px;
        width: 40px;
        background-color: rgb(57, 140, 202);
        border: none;
    }

    :host ::ng-deep .speeddial-right ul li a{
        height: 40px;
        width: 40px;
    }
  `,
})
export class SpeedDialComponent {

  public leftTooltipItems: MenuItem[] = [];

  private readonly _route = inject(Router);

  ngOnInit() {
    this.leftTooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Logout',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-sign-out',
        command: () => {
          this._route.navigate(['/login']);
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Ajustes',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-cog',
        command: () => {},
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Usuario',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-user',
        command: () => {},
      },
    ];
  }
}
