import { Component, OnInit, inject } from '@angular/core';
import { CargaEnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-lista-envases',
  templateUrl: './lista-envases.component.html',
  styleUrls: ['./lista-envases.component.sass'],
})
export class ListaEnvasesComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);

  public envases: any[] = [];

  ngOnInit(): void {
    this.cargaEnvaseService
      .observableEnvases()
      .subscribe((envases) => (this.envases = envases));
  }
}
