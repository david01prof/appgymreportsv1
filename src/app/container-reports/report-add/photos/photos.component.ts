import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { IPhotos } from '@app/models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

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
  public readonly _reportSvc = inject(ReportsService);
  public readonly _messageSvc = inject(MessageService);

  public dataPhotos = output<IPhotos[]>();
  public activeInputImage = output<boolean>();
  public imageErrorTittle: string[] = [];
  public files = [];
  public filesRefresh = signal<File[]>([]);
  public base64images = signal<IPhotos[]>([]);
  public maxSize: number = 1.3;

  private readonly _confirmationSvc = inject(ConfirmationService);
  // Método personalizado para manejar la carga de archivos

  onSelectedFileUpload(event: FileSelectEvent) {
    let maxSize: number = this.maxSize * 1024 * 1024; // Tamaño máximo de 1.3 MB en bytes de firebase
    let filesArray = Array.from(event.files);

    for (let indexFile in filesArray) {
      if (filesArray[indexFile].size > maxSize) {
        this.imageErrorTittle.push(filesArray[indexFile].name);
      }

      for (let fileRefresh of this.filesRefresh()) {
        if (filesArray.length > 0 && fileRefresh.name == filesArray[indexFile].name) {
          filesArray.splice(parseInt(indexFile), 1);
          this.confirm2(fileRefresh.name);
        }
      }
    }

    if (this.imageErrorTittle.length > 0) {
      this.confirm1();
    }

    this.refresListFiles(filesArray);

    if(this.filesRefresh().length > 0){
      this.activeInputImage.emit(true);
    }else{
      this.activeInputImage.emit(false);
    }
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
    this.activeInputImage.emit(false);
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
    this.filesRefresh().splice(index, 1);
    this.activeInputImage.emit(false);
  }

  refresListFiles(files: File[]) {
    if (this.imageErrorTittle.length > 0) {
      //Fitrados sin errores de maxsizing
      let filteredFiles = files.filter(
        (file) => !this.imageErrorTittle.includes(file.name)
      );

      let copyFilesRefresh = this.filesRefresh();
      for (let filtered of filteredFiles) {
        if (!this.filesRefresh().includes(filtered)) {
          copyFilesRefresh.push(filtered);
        }
      }
      this.filesRefresh.set([...copyFilesRefresh]);
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
        ' seleccionado excede el límite de  '+this.maxSize+'MB.';
    } else {
      let jonText = this.imageErrorTittle.join(', ');
      message =
        'Los archivos:' + jonText + ' exceden cada uno el límite de '+this.maxSize+'MB.';
    }
    this._confirmationSvc.confirm({
      message: message,
      header: 'Error al subir los ficheros',
      icon: 'pi pi-exclamation-triangle text-orange-300',
      acceptVisible: false,
      rejectVisible: false,
    });
  }

  private confirm2(title: string) {
    let message = 'El archivo:' + title + ' ya existe';
    this._confirmationSvc.confirm({
      message: message,
      header: 'Fichero resubidos',
      icon: 'pi pi-exclamation-triangle text-orange-300',
      acceptVisible: false,
      rejectVisible: false,
    });
  }

  private changeImageToBase64(files: File[]) {
    let copyBase64Images = this.base64images();
    for (let file of files) {
      this.convertFileToBase64(file).then((base64) => {
        copyBase64Images.push({ base64: base64 });
        this.base64images.set([...copyBase64Images]);
      });
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file); // Convierte el archivo a Base64
    });
  }
}
