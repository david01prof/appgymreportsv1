import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MeasurementForm,
  PhotosForm,
  ReportForm,
} from '@app/main-container/components/interfaces';
import { emptyReport } from '@app/models';
import { MessageService } from 'primeng/api';
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
  public readonly _registerSvc = inject(RegistersService);
  public readonly _messageSvc = inject(MessageService);

  public dataPhotos = output<IPhotos[]>();

  public base64Images: IPhotos[] = [];
  public files = [];

  private totalSize: number = 0;
  private totalSizePercent: number = 0;

  choose(callback: any) {
    callback();
  }

  onRemoveTemplatingFile(event: any,file: any,removeFileCallback: any,index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this._registerSvc.formatSize(file.size));
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
    this._messageSvc.add({
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
    console.log('entra');
    
    callback();
    console.log(this.base64Images)
    this.dataPhotos.emit(this.base64Images);
  }

  public measurementEmptyForm = computed(() => emptyReport);
  public reportForm: Signal<FormGroup<ReportForm>> = computed(
    () =>
      new FormGroup<ReportForm>({
        measurement: new FormGroup<MeasurementForm>({
          height: new FormControl(
            this.measurementEmptyForm().measurement.height,
            { nonNullable: true }
          ),
          weight: new FormControl(
            this.measurementEmptyForm().measurement.weight,
            { nonNullable: true }
          ),
          waist: new FormControl(
            this.measurementEmptyForm().measurement.waist,
            { nonNullable: true }
          ),
          hip: new FormControl(this.measurementEmptyForm().measurement.hip, {
            nonNullable: true,
          }),
          totaligc: new FormControl(
            this.measurementEmptyForm().measurement.totaligc,
            { nonNullable: true }
          ),
        }),
        photos: new FormGroup<PhotosForm>({
          base64: new FormControl('', { nonNullable: true }),
        }),
      })
  );
}
