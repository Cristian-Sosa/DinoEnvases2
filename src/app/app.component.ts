import { Component, OnInit, inject } from '@angular/core';
import { AuthService, ToastService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public isToast: boolean = true;

  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.updateActiveUsers();
    this.toastService
      .getToastObservable()
      .subscribe((newState) => (this.isToast = newState.show));

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
