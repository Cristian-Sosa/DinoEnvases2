import { Component, OnInit, inject } from '@angular/core';
import { ToastService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public isToast: boolean = true;

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService
      .getToastObservable()
      .subscribe((newState) => (this.isToast = newState.show));

    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('El usuario ha permitido el permiso para notificaciones push')
        } else if (permission === 'denied') {
          console.warn(
            'El usuario ha denegado el permiso para notificaciones push.'
          );
        } else if (permission === 'default') {
          console.warn(
            'El usuario cerró el diálogo de solicitud de permisos sin tomar una decisión.'
          );
        }
      });
    }
  }
}
