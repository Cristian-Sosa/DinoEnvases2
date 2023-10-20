import { Component, OnInit, inject } from '@angular/core';
import { EnvaseService } from 'src/app/shared';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-lista-envases',
  templateUrl: './lista-envases.component.html',
  styleUrls: ['./lista-envases.component.sass'],
})
export class ListaEnvasesComponent implements OnInit {
  private envaseService = inject(EnvaseService);
  private readonly swPush = inject(SwPush);

  public envases: any[] = [];

  ngOnInit(): void {
    this.envaseService
      .observableEnvases()
      .subscribe((envases) => (this.envases = envases));

    navigator.serviceWorker
      .getRegistration()
      .then((reg) =>
        reg?.showNotification(
          'Ma´ que lo´ que estás buscando? Quere´ que yo te azote? Pide que le meta fuegote. Cachetazo en la nalga y beso para el escote'
        )
      );
  }
}
