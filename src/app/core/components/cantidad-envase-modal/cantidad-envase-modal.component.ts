import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastService,
  ISelect,
  CargaEnvaseService,
  EnvaseService,
} from 'src/app/shared';

@Component({
  selector: 'app-cantidad-envase-modal',
  templateUrl: './cantidad-envase-modal.component.html',
  styleUrls: ['./cantidad-envase-modal.component.sass'],
})
export class CantidadEnvaseModalComponent implements OnInit {
  private location = inject(Location);
  private toastService = inject(ToastService);

  private cargaEnvaseService = inject(CargaEnvaseService);
  private EnvaseService = inject(EnvaseService);

  public colorContent: ISelect = {
    name: 'color',
    options: this.cargaEnvaseService.getStaticData().tipoEnvase.tipo.cerveza,
  };

  tipoEnvaseForm = new FormGroup({
    colorControl: new FormControl('verde', [
      Validators.required,
      Validators.nullValidator,
    ]),
    cantidadControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
      Validators.min(1),
      Validators.max(5000),
    ]),
  });

  ngOnInit(): void {
    this.EnvaseService.getEnvaseObservable().subscribe((envase) => {
      switch (envase.TipoEnvase.Nombre) {
        case 'cerveza':
          this.colorContent.options =
            this.cargaEnvaseService.getStaticData().tipoEnvase.tipo.cerveza;
          break;

        case 'gaseosa':
          this.colorContent.options =
            this.cargaEnvaseService.getStaticData().tipoEnvase.tipo.gaseosa;
          break;

        case 'drago':
          this.colorContent.options =
            this.cargaEnvaseService.getStaticData().tipoEnvase.tipo.drago;
          break;

        case 'cajon':
          this.colorContent.options =
            this.cargaEnvaseService.getStaticData().tipoEnvase.tipo.cajones;
          break;

        default:
          
          break;
      }
    });
  }

  returnProcess = (): void => this.location.back();

  forwardProcess = (): void => {
    let color: any =
    this.tipoEnvaseForm.get('colorControl')?.value;
    let cantidad: string | null | undefined =
      this.tipoEnvaseForm.get('cantidadControl')?.value;

      console.log({
        color: color,
        cantidad: cantidad
      })
    if (!cantidad) {
      this.toastService.setToastState(true, 'Cantidad inválida');

      setTimeout(() => this.toastService.setToastState(false), 3000);
    } else {
      this.EnvaseService.setTipoEnvase(color!);
      this.EnvaseService.setUnidades(cantidad);
      this.EnvaseService.createNewEnvase()
    }
  };
}
