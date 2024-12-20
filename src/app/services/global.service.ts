import { Injectable, signal } from '@angular/core';
import { emptyUser, IUser } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sharedSignal = signal<boolean>(false);
  userInfo = signal<IUser>(emptyUser);

  updateSignal(value: boolean) {
    this.sharedSignal.set(value);
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
