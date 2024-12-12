import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet name="content"></router-outlet>
  `,
})

export class LayoutComponent {

  ngOninit() {
    console.log('layout');
  }

}