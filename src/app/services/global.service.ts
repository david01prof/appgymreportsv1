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
}
