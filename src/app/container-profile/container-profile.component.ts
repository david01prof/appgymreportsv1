import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { DataUserComponent } from './components/data-user/data-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserWeightComponent } from "./components/user-weight/user-weight.component";

const PRIME_MODULES = [CardModule,DividerModule,AvatarModule,ButtonModule,AccordionModule];

@Component({
  selector: 'app-container-profile',
  standalone: true,
  imports: [PRIME_MODULES, DataUserComponent, ResetPasswordComponent, UserWeightComponent],
  templateUrl: './container-profile.component.html',
  styleUrl: './container-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerProfileComponent {


}
