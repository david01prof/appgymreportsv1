import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sharedSignal = signal<boolean>(false);

  updateSignal(value: boolean) {
    this.sharedSignal.set(value);
  }
}
