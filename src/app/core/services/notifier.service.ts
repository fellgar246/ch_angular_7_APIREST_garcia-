import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface MyCustomNotification {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notifier$ = new Subject<MyCustomNotification>();

  constructor() {
    this.notifier$.subscribe({
      next: (myNotification) => {
        Swal.fire(
          myNotification.title,
          myNotification.message,
          myNotification.type,
        )
      }
    })
  }

  showSuccess(title: string, message: string): void {
    this.notifier$.next({
      type: 'success',
      title,
      message,
    })
  }

  showError(title: string, message: string): void {
    this.notifier$.next({
      type: 'error',
      title,
      message,
    })
  }
}
