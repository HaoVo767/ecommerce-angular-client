import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastProvider {
  readonly isShow = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly status = signal<string>('');

  showToast(message: string) {
    this.isShow.set(true);
    this.message.set(message);
  }
  closeToast() {
    this.isShow.set(false);
  }
  setStatus(status: string) {
    this.status.set(status);
  }
}
