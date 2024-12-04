import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { IPhotos } from '@app/models';
import { RegistersService } from '@app/reports/services/registers.service';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

const PRIME_MODULES = [
  FileUploadModule,
  ButtonModule,
  BadgeModule,
  ToastModule,
  CardModule
];

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent {
  
  public readonly _registerSvc = inject(RegistersService);
  public readonly _messageSvc = inject(MessageService);
  
  public dataPhotos = output<IPhotos[]>();
  public  base64Images: IPhotos[] = [];
  public files = [];

  choose(callback: any) {
    callback();
  }

  onRemoveTemplatingFile( event: any, file: any,removeFileCallback: any, index: any ) {
    removeFileCallback(event, index);
    this.base64Images.splice(index, 1);
  }

  //TODO TEMPORAL
  onTemplatedUpload() {
    this._messageSvc.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event: any) {
    const files: File[] = event.files; // Archivos seleccionados en el evento

    for (let file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        // reader.result contiene el Base64 de la imagen
        if (reader.result) {
          this.base64Images.push({ base64: reader.result as string });
        }
      };

      reader.onerror = (error) => {
        console.error('Error al convertir la imagen a Base64:', error);
      };
    }
  }

  uploadEvent(callback: any) {
    callback();
    this.dataPhotos.emit(this.base64Images);
  }
}
