import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { Auth } from "@angular/fire/auth";
import { AuthService } from "@app/auth/data-access/auth.service";
import { GlobalService } from "@app/services";

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

  private readonly auth = inject(Auth);
  private readonly _authSvc = inject(AuthService);
  private readonly _globalSvc = inject(GlobalService);

  async ngOnInit() {
    let userInfo =  await this._authSvc.getUserById(this.auth.currentUser!.uid);    
    console.log(userInfo);
    
    this._globalSvc.userInfo.set(userInfo);
  }
}