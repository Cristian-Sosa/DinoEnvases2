import { Component, OnInit, inject } from '@angular/core';
import { ToastService } from './shared';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public isToast: boolean = true;
  private readonly swPush = inject(SwPush);

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService
      .getToastObservable()
      .subscribe((newState) => (this.isToast = newState.show));
      
      navigator.serviceWorker.getRegistration().then((reg) => reg?.showNotification('asdad'))
  }

}
