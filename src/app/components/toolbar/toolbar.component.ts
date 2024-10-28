import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MenubarModule,TableComponent],
  template: `
    <div class="card">
      <p-menubar [model]="items" />
    </div>
  `,
  styles: ``,
})
export class ToolbarComponent {
  
  public items: MenuItem[] | undefined;

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
              url: 'registers'
          },
          {
              label: 'Rutinas',
              icon: 'pi pi-search',
              url: 'routines',
          }
      ]
  }

}
