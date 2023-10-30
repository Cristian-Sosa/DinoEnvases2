import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargaEnvaseService, EnvaseService } from 'src/app/shared';
import { ToastService } from 'src/app/shared';

@Component({
  selector: 'app-tipo-envase-modal',
  templateUrl: './tipo-envase-modal.component.html',
  styleUrls: ['./tipo-envase-modal.component.sass'],
})
export class TipoEnvaseModalComponent implements OnInit {
  private envase: any = undefined;
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private cargaEnvaseService = inject(CargaEnvaseService);
  private envaseService = inject(EnvaseService);

  public tipoEnvases: Array<any> =
    this.cargaEnvaseService.getStaticData().tipoEnvase.nombre;

  tipoEnvaseForm = new FormGroup({
    envaseControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  ngOnInit(): void {
    this.envaseService
      .getEnvaseObservable()
      .subscribe((envase) => (this.envase = envase));
  }

  returnProcess = (): void => this.location.back();

  forwardProcess = (): void => {
    let envase: string | null | undefined =
      this.tipoEnvaseForm.get('envaseControl')?.value;

    if (!envase) {
      this.toastService.setToastState(true, 'Seleccioná un envase para seguir');

      setTimeout(() => this.toastService.setToastState(false), 3000);
    } else {
      this.envaseService.setNombreEnvase(envase);
      this.router.navigate(['..', 'cantidad-envase'], {
        relativeTo: this.route,
      });
    }
  };
}
