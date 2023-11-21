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
      Notification.requestPermission();
    }
  }
}
