import { Component, inject } from '@angular/core';
import { AuthStateService } from '@app/shared/data-access/auth.state.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MenubarModule],
  template: `
    <div class="card">
      <p-menubar [model]="items" />
    </div>

    <button (click)="logout()">Logout</button>
  `,
  styles: ``,
})
export class ToolbarComponent {
  
  public items: MenuItem[] | undefined;
  private readonly _authSvc = inject(AuthStateService);

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              url: 'dashboard'
          },
          {
              label: 'Reportes',
              icon: 'pi pi-star',
              url: 'reports'
          },
          {
              label: 'Rutinas',
              icon: 'pi pi-search',
              url: 'routines',
          }
      ]
  }

   logout(){
    this._authSvc.logout();
  }

}
