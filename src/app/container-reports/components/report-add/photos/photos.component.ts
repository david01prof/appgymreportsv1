import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { IPhotos } from '@app/models';
import { RegistersService } from '@app/reports/services/registers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgxImageCompressService } from 'ngx-image-compress';

const PRIME_MODULES = [
  FileUploadModule,
  ButtonModule,
  BadgeModule,
  ToastModule,
  ConfirmDialogModule,
];

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  public readonly _registerSvc = inject(RegistersService);
  public readonly _messageSvc = inject(MessageService);

  public dataPhotos = output<IPhotos[]>();
  public imageErrorTittle: string[] = [];
  public files = [];
  public filesRefresh = signal<File[]>([]);
  public base64images = signal<IPhotos[]>([]);

  private readonly _confirmationSvc = inject(ConfirmationService);
  private readonly _imageCompressSvc = inject(NgxImageCompressService);

  constructor(){
    effect(() => {
      const d = this.base64images();
      console.log('Modificado');
      console.log(d[0]);
      
    });
  }
  // Método personalizado para manejar la carga de archivos

  onSelectedFileUpload(event: FileSelectEvent) {
    let maxSize: number = 2 * 1024 * 1024; // Tamaño máximo de 2 MB en bytes
    let filesArray = Array.from(event.files);

    for (let indexFile in filesArray) {
      if (filesArray[indexFile].size > maxSize) {
        this.imageErrorTittle.push(filesArray[indexFile].name);
      }
    }

    if (this.imageErrorTittle.length > 0) {
      this.confirm1();
    }

    this.refresListFiles(filesArray);
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

  // Buttons actions

  choose(callback: any) {
    callback();
  }

  uploadEvent(callback: any) {
    callback();
    this.dataPhotos.emit(this.base64images());
  }

  // Body actions

  onRemoveTemplatingFile(
    event: any,
    file: any,
    removeFileCallback: any,
    index: any
  ) {
    removeFileCallback(event, index);
    this.base64images().splice(index, 1);
  }

  refresListFiles(files: File[]) {
    if (this.imageErrorTittle.length > 0) {
      let filteredFiles = files.filter(
        (file) => !this.imageErrorTittle.includes(file.name)
      );

      for (let filtered of filteredFiles) {
        if (!this.filesRefresh().includes(filtered)) {
          this.filesRefresh().push(filtered);
        }
      }
    } else {
      for (let file of files) {
        this.filesRefresh().push(file);
      }
    }

    this.base64images.set([]);
    this.changeImageToBase64(this.filesRefresh());
  }

  private confirm1() {
    let message = '';
    if (this.imageErrorTittle.length == 1) {
      message =
        'El archivo:' +
        this.imageErrorTittle[0] +
        ' seleccionado excede el límite de 2 MB.';
    } else {
      let jonText = this.imageErrorTittle.join(', ');
      message =
        'Los archivos:' + jonText + ' exceden cada uno el límite de 2 MB.';
    }
    this._confirmationSvc.confirm({
      message: message,
      header: 'Error al subir los ficheros',
      icon: 'pi pi-exclamation-triangle text-orange-300',
      acceptVisible: false,
      rejectVisible: false,
    });
  }

  private confirm2() {
    let message = '';
    if (this.imageErrorTittle.length == 1) {
      message = 'El archivo:' + this.imageErrorTittle[0] + ' ya existe';
    } else {
      let jonText = this.imageErrorTittle.join(', ');
      message =
        'Los archivos:' + jonText + ' exceden cada uno el límite de 2 MB.';
    }
    this._confirmationSvc.confirm({
      message: message,
      header: 'Error al subir los ficheros',
      icon: 'pi pi-exclamation-triangle text-orange-300',
      acceptVisible: false,
      rejectVisible: false,
    });
  }

  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';

  private changeImageToBase64(files: File[]) {
    for (let file of files) {
      this.convertFileToBase64(file).then(base64 => {
        console.log(base64);  // Imagen en formato Base64
        
        this.base64images().push({ base64: base64 });
        console.log(this.base64images());
      });
    }

    console.log(this.base64images());
    
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      
      reader.readAsDataURL(file);  // Convierte el archivo a Base64
    });
  }
}
