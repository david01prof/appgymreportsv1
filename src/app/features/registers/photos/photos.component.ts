import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { RegistersService } from '../registers.service';
import { IPhotos } from '../interfaces/iregister';

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
  files = [];
  base64Images: IPhotos[] = [];
  totalSize: number = 0;

  totalSizePercent: number = 0;

  private readonly _registerSvc = inject(RegistersService);

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  choose(event: any, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(
    event: any,
    file: any,
    removeFileCallback: any,
    index: any
  ) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
    this.base64Images.splice(index, 1);
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

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
      this.totalSize += parseInt(this.formatSize(file.size));
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
  clearAll() {
    this.base64Images = [];
  }

  uploadEvent(callback: any) {
    callback();
    this._registerSvc.pushPhotosInRegister(this.base64Images);
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes![0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes![i]}`;
  }
}
