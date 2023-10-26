import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IToast } from 'src/app/shared';
import { ToastService } from 'src/app/shared';

@Component({
  selector: 'app-tipo-envase-modal',
  templateUrl: './tipo-envase-modal.component.html',
  styleUrls: ['./tipo-envase-modal.component.sass'],
})
export class TipoEnvaseModalComponent {
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
    } else {
      this.router.navigate(['..', 'cantidad-envase'], {
        relativeTo: this.route,
      });
    }
  };
}
