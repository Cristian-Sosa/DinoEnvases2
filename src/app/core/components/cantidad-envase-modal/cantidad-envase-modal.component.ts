import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared';

@Component({
  selector: 'app-cantidad-envase-modal',
  templateUrl: './cantidad-envase-modal.component.html',
  styleUrls: ['./cantidad-envase-modal.component.sass'],
})
export class CantidadEnvaseModalComponent {
  private toastService = inject(ToastService);

  @Output() cantidadEnvase: EventEmitter<{
    tipo: string;
    cantidad: string | number;
  } | null> = new EventEmitter();

  @Input() tipoEnvase!: any;

  tipoEnvaseForm = new FormGroup({
    tipoControl: new FormControl(null, [
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

  returnProcess = (): void => this.cantidadEnvase.emit(null);

  forwardProcess = (): void => {
    let tipo: any = this.tipoEnvaseForm.get('tipoControl')?.value;
    let cantidad: string | null | undefined =
      this.tipoEnvaseForm.get('cantidadControl')?.value;

    if (!cantidad) {
      this.toastService.setToastState(true, 'Cantidad inválida');

      setTimeout(() => this.toastService.setToastState(false), 3000);
    } else {
      !tipo ? (tipo = this.tipoEnvase[0].description) : undefined;

      console.log(tipo);
      let obj: any = {
        tipo: tipo,
        cantidad: cantidad,
      };

      this.cantidadEnvase.emit(obj);
    }
  };
}
