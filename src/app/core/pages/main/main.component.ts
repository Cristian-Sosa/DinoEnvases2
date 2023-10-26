import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CargaEnvaseService, EnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);
  private router = inject(Router);

  public cargaExist: boolean = false;

  ngOnInit(): void {
    this.cargaEnvaseService
      .observableEnvases()
      .subscribe((res) =>
        res.length > 0 ? (this.cargaExist = true) : (this.cargaExist = false)
      );
    this.cargaEnvaseService.checkCargaPendiente();
  }

  newEnvase = (): void => {
    this.router.navigate(['carga/nuevo-envase/tipo-envase']);
  };
}
