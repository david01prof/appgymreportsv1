import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule],
  template: `
    <div class="card flex justify-content-left my-3">
      <p-breadcrumb
        class="custom-breadcrumb"
        class="max-w-full"
        [model]="itemsLabels()"
        [home]="home"
      />
    </div>
  `,
  styles: `
    ::ng-deep .p-breadcrumb {
      background-color: transparent;
  }
  `,
})
export class BreadcrumbComponent {
  itemsLabels = input.required<MenuItem[] | undefined>();
  urlActive = input.required<string>();

  home: MenuItem | undefined;

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' + this.urlActive };
  }
}
