import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private envaseService = inject(EnvaseService);
  private router = inject(Router);

  public cargaExist: boolean = false;

  ngOnInit(): void {
    this.envaseService
      .observableEnvases()
      .subscribe((res) =>
        res.length > 0 ? (this.cargaExist = true) : (this.cargaExist = false)
      );
    this.envaseService.checkCargaPendiente();
  }

  newEnvase = (): void => {
    this.router.navigate(['carga/nuevo-envase/tipo-envase'])
  }
}
