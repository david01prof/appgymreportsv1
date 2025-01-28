import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsPrimeModule } from '@app/container-reports/reports-prime.module';
import { ReportsService } from '@app/container-reports/services/reports.service';
import { IPhotos } from '@app/models';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [ReportsPrimeModule,FormsModule,ReactiveFormsModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {

  public readonly _reportSvc = inject(ReportsService);
  public readonly _messageSvc = inject(MessageService);

  public activeInputImage = output<boolean>();
  public dataPhotos = output<IPhotos[]>();

  public imageErrorTitle: string[] = [];
  public maxSize: number = 1.3;
  public files : any[]= [];

  private readonly fb = inject(FormBuilder);
  public form : FormGroup = this.fb.group({
    photos: this.fb.array([]) // Inicialmente vacío
  });

  // Getter para el FormArray
  get photos(): FormArray {
    return this.form.get('photos') as FormArray;
  }

  onSelectedFileUpload(event: FileSelectEvent) {

    const maxSize: number = this.maxSize * 1024 * 1024; // Tamaño máximo de 1.3 MB en bytes de firebase
    let filesArray = Array.from(event.files);

    filesArray.forEach((file) => {
      if(file.size > maxSize){
        this.imageErrorTitle.push(file.name);
        this._messageSvc.add( { severity: 'warn', summary: 'Archivo duplicado', detail: 'El archivo seleccionado excede el límite de  '+this.maxSize+'MB.', life:3000 });
      }
    });

    let filesWithoutErrors = filesArray.filter((file) => !this.imageErrorTitle.includes(file.name)); // Archivos sin errores

    for(let file of filesWithoutErrors){
      if(!this.files.find(f => f.name == file.name)){
        this.files.push(file);
      }else{
        this._messageSvc.add( { severity: 'warn', summary: 'Archivo duplicado', detail: 'El archivo: ' + file.name + ' ya existe', life:3000 });
      }
    }    
  
    this.changeImageToBase64(filesWithoutErrors);

    if(this.files.length > 0){ this.activeInputImage.emit(true); }else{ this.activeInputImage.emit(false); }
  }

  // Buttons actions

  choose(callback: any) {
    callback();
  }

  uploadEvent(callback: any) {
    callback();
    this.dataPhotos.emit(this.form.get('photos')?.value);
    this.activeInputImage.emit(false);
  }

  // Body actions

  onRemoveTemplatingFile(
    event: any,
    removeFileCallback: any,
    index: any
  ) {
    removeFileCallback(event, index);
    this.removePhoto(index);
  }

  private removePhoto(index: number) {
    this.photos.removeAt(index);
  }
  private changeImageToBase64(files: File[]) {
    let photosBase64 = []
    for (let file of files) {
      this.convertFileToBase64(file).then((base64) => {
        photosBase64.push({ base64: base64 , observations: '', title: file.name, size: file.size });
        this.createForm(photosBase64);
      });
    }
  }
  
  private createForm(photosBase64:IPhotos[]){
    for(let photo of photosBase64){  
      const existingFormGroup = this.photos.controls.find(group => group.get('base64')?.value === photo.base64);

      if(!existingFormGroup){
        const photoGroup = this.fb.group({
          base64: new FormControl(photo.base64),
          observations: new FormControl(photo.observations),
          title: new FormControl(photo.title),
          size: new FormControl(photo.size),
        });

        this.photos.push(photoGroup);
      }
    }
    
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file); // Convierte el archivo a Base64
    });
  }
}
