import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '@app/auth/data-access/auth.service';
import { GlobalService } from '@app/services';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataUserComponent } from './components/data-user/data-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserWeightComponent } from './components/user-weight/user-weight.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Auth } from '@angular/fire/auth';

const PRIME_MODULES = [
  CardModule,
  DividerModule,
  AvatarModule,
  ButtonModule,
  AccordionModule,
  FileUploadModule,
  ConfirmDialogModule,
];

@Component({
  selector: 'app-container-profile',
  standalone: true,
  imports: [
    PRIME_MODULES,
    DataUserComponent,
    ResetPasswordComponent,
    UserWeightComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './container-profile.component.html',
  styleUrl: './container-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class ContainerProfileComponent {
  public base64Image = signal<string>('');
  public readonly _authSvc = inject(AuthService);
  public readonly _globalSvc = inject(GlobalService);

  private readonly _confirmationSvc = inject(ConfirmationService);
  private readonly _auth = inject(Auth);
  private maxFileSize = 500000;

  constructor() {
    effect(() => {
      this.base64Image.set(this._globalSvc.userInfo().photo) // Recoge imagen del usuario
    },{ allowSignalWrites: true });
  }

  onUpload(event: any) {
    const files = event.files;
    if (files != undefined) {
      for (const file of files) {
        if (file.size > this.maxFileSize) {
          this.confirm1();
          event.cancel = true; // Cancela la carga del archivo
          break;
        } else {
          this._globalSvc.convertFileToBase64(event.files[0]).then((base64) => {
            this.base64Image.set(base64);
            this._globalSvc.userInfo().photo = base64;
            this._authSvc.updateUser(this._auth.currentUser!.uid,this._globalSvc.userInfo()); // TODO Actualiza el usuario
          });
        }
      }
    }
  }

  private confirm1() {
    this._confirmationSvc.confirm({
      message: 'El archivo seleccionado excede el límite de  MB.',
      header: 'Error al subir los ficheros',
      icon: 'pi pi-exclamation-triangle text-orange-300',
      acceptVisible: false,
      rejectVisible: false,
    });
  }
}
