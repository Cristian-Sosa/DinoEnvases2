import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService, IToast } from 'src/app/shared';

@Component({
  selector: 'app-cantidad-envase-modal',
  templateUrl: './cantidad-envase-modal.component.html',
  styleUrls: ['./cantidad-envase-modal.component.sass'],
})
export class CantidadEnvaseModalComponent {
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  public isCajonDisabled: boolean = false;

  tipoEnvaseForm = new FormGroup({
    envaseControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    cajonControl: new FormControl(
      { value: false, disabled: this.isCajonDisabled },
      [Validators.required, Validators.nullValidator]
    ),
  });

  returnProcess = (): void => this.location.back();

  changeDisabled = (): void => {
    let envase: string | null | undefined =
      this.tipoEnvaseForm.get('envaseControl')?.value;

    envase! == 'drago'
      ? (this.isCajonDisabled = true)
      : (this.isCajonDisabled = false);
  };

  forwardProcess = (): void => {
    let envase: string | null | undefined =
      this.tipoEnvaseForm.get('envaseControl')?.value;
    let isCajon: boolean = this.tipoEnvaseForm.get('cajonControl')?.value!;

    console.log(envase);
    if (!envase) {
      let toast: IToast = {
        text: 'Seleccioná un envase para seguir',
        show: true,
      };

      this.toastService.setToastState(toast);

      setTimeout(
        () => ((toast.show = false), this.toastService.setToastState(toast)),
        3000
      );
    } else if (isCajon) {
      this.router.navigate(['..', 'tipo-cajon'], { relativeTo: this.route });
    }
  };
}
