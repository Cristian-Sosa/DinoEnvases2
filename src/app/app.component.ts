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
      
      navigator.serviceWorker.getRegistration().then((reg) => reg?.showNotification('Ma´ que lo´ que estás buscando? Quere´ que yo te azote? Pide que le meta fuegote. Cachetazo en la nalga y beso para el escote'))
  }

}
