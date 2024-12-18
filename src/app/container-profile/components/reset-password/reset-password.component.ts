import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/data-access/auth.service';
import { GlobalService } from '@app/services';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,PasswordModule,ButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  private readonly _globalSvc = inject(GlobalService);
  private readonly _authSvc = inject(AuthService);

  value!: string;

  reset(){
    this._authSvc.resetPassword(this._globalSvc.userInfo().email);
  }
}
