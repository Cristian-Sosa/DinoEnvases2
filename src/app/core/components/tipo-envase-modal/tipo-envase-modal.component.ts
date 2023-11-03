import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargaEnvaseService } from 'src/app/shared';
import { ToastService } from 'src/app/shared';

@Component({
  selector: 'app-tipo-envase-modal',
  templateUrl: './tipo-envase-modal.component.html',
  styleUrls: ['./tipo-envase-modal.component.sass'],
})
export class TipoEnvaseModalComponent {
  private toastService = inject(ToastService);
  private cargaEnvaseService = inject(CargaEnvaseService);

  public tipoEnvases: Array<any> =
    this.cargaEnvaseService.getNombreEnvases();

  @Output() tipoEnvase: EventEmitter<string | null> = new EventEmitter();

  tipoEnvaseForm = new FormGroup({
    envaseControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  returnProcess = (): void => this.tipoEnvase.emit(null);

  forwardProcess = (): void => {
    let envase: string | null | undefined =
      this.tipoEnvaseForm.get('envaseControl')?.value;

    if (!envase) {
      this.toastService.setToastState(true, 'Seleccioná un envase para seguir');

      setTimeout(() => this.toastService.setToastState(false), 3000);
    } else {
      this.tipoEnvase.emit(envase);
    }
  };
}
