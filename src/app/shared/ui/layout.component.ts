import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { SpeedDialComponent } from "@app/components/speed-dial/speed-dial.component";
import { ToolbarComponent } from "@app/components/toolbar/toolbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToolbarComponent,RouterOutlet,SpeedDialComponent],
  template: `
    <section>
      <app-toolbar></app-toolbar>
    </section>

    <router-outlet />

    <section>
        <app-speed-dial></app-speed-dial>
    </section>
  
  `,
})

export class LayoutComponent {

}