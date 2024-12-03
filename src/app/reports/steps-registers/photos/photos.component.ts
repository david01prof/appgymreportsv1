import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { IPhotos } from '../../interfaces/iregister';
import { RegistersService } from '../../services/registers.service';

const PRIME_MODULES = [
  FileUploadModule,
  ButtonModule,
  BadgeModule,
  ProgressBarModule,
  ToastModule,
];

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  providers: [MessageService],
})
export class PhotosComponent {
  
  public dataPhotos = output<IPhotos[]>();
  public files = [];
  public  base64Images: IPhotos[] = [];

  private totalSize: number = 0;
  private totalSizePercent: number = 0;

  public readonly _registerSvc = inject(RegistersService);

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  choose(callback: any) {
    callback();
  }

  onRemoveTemplatingFile( event: any, file: any,removeFileCallback: any, index: any ) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this. _registerSvc.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
    this.base64Images.splice(index, 1);
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  //TODO TEMPORAL
  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    this.files.forEach((file: any) => {
      this.totalSize += parseInt(this._registerSvc.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;

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
