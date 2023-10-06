import { Component, OnInit, inject } from '@angular/core';
import { EnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-lista-envases',
  templateUrl: './lista-envases.component.html',
  styleUrls: ['./lista-envases.component.sass']
})
export class ListaEnvasesComponent implements OnInit{
  private envaseService = inject(EnvaseService);

  public envases: any[] = [];

  ngOnInit(): void {
    this.envaseService
      .observableEnvases()
      .subscribe((envases) => (this.envases = envases));
      console.log(this.envases)

      this.envaseService.setEnvases()
  }
}
