import { Component } from '@angular/core';
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
  `,
  styles: ``,
})
export class ToolbarComponent {
  
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              url: 'dashboard'
          },
          {
              label: 'Calculadora(PGC)',
              icon: 'pi pi-star',
              url: 'calculator'
          },
          {
              label: 'Rutinas',
              icon: 'pi pi-search',
              url: 'routines',
          }
      ]
  }
}
